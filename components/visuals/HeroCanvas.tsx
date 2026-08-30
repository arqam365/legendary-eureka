"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 110
const GOLD_RATIO = 0.09         // ~10 gold particles
const CONNECTION_THRESHOLD = 1.6 // world-units
const MAX_CONNECTIONS = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2

// Per-particle state (outside React state — mutable, not reactive)
interface Pt {
  ox: number; oy: number; oz: number   // original position
  phase: number                          // sine offset
  speed: number                          // drift speed multiplier
  gold: boolean
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Camera ─────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Particle data ──────────────────────────────────────────────────────
    const pts: Pt[] = []
    const posArr = new Float32Array(PARTICLE_COUNT * 3)
    const colArr = new Float32Array(PARTICLE_COUNT * 3)

    const GOLD = new THREE.Color("#C9A227")
    const WHITE = new THREE.Color("#FFFFFF")

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const gold = Math.random() < GOLD_RATIO
      const p: Pt = {
        ox: (Math.random() - 0.5) * 11,
        oy: (Math.random() - 0.5) * 6.5,
        oz: (Math.random() - 0.5) * 2.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        gold,
      }
      pts.push(p)
      posArr[i * 3]     = p.ox
      posArr[i * 3 + 1] = p.oy
      posArr[i * 3 + 2] = p.oz

      const c = gold ? GOLD : WHITE
      colArr[i * 3]     = c.r
      colArr[i * 3 + 1] = c.g
      colArr[i * 3 + 2] = c.b
    }

    // ── Points mesh ────────────────────────────────────────────────────────
    const ptGeo = new THREE.BufferGeometry()
    const ptPos = new THREE.BufferAttribute(posArr, 3)
    ptPos.setUsage(THREE.DynamicDrawUsage)
    ptGeo.setAttribute("position", ptPos)
    ptGeo.setAttribute("color", new THREE.BufferAttribute(colArr, 3))

    const ptMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const pointsMesh = new THREE.Points(ptGeo, ptMat)
    scene.add(pointsMesh)

    // ── Line segments (dynamic buffer) ─────────────────────────────────────
    // Pre-allocate worst-case: MAX_CONNECTIONS lines × 2 endpoints × 3 floats
    const lineArr = new Float32Array(MAX_CONNECTIONS * 2 * 3)
    const lineGeo = new THREE.BufferGeometry()
    const linePos = new THREE.BufferAttribute(lineArr, 3)
    linePos.setUsage(THREE.DynamicDrawUsage)
    lineGeo.setAttribute("position", linePos)
    lineGeo.setDrawRange(0, 0)

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    })
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(linesMesh)

    // ── Mouse parallax state ───────────────────────────────────────────────
    let rawMx = 0, rawMy = 0
    let smoothMx = 0, smoothMy = 0

    const onMouseMove = (e: MouseEvent) => {
      rawMx = (e.clientX / window.innerWidth  - 0.5) * 2   // -1 to 1
      rawMy = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    // ── Animation ─────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Smooth mouse
      smoothMx += (rawMx - smoothMx) * 0.035
      smoothMy += (rawMy - smoothMy) * 0.035

      // Subtle camera drift from mouse
      camera.position.x = smoothMx * 0.35
      camera.position.y = -smoothMy * 0.2
      camera.lookAt(0, 0, 0)

      // Update particle positions — sine-wave drift
      let lineIdx = 0

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = pts[i]
        const s = p.speed

        const nx = p.ox + Math.sin(t * s * 0.25 + p.phase) * 0.18
        const ny = p.oy + Math.cos(t * s * 0.18 + p.phase * 1.3) * 0.12
        const nz = p.oz + Math.sin(t * s * 0.12 + p.phase * 0.7) * 0.07

        posArr[i * 3]     = nx
        posArr[i * 3 + 1] = ny
        posArr[i * 3 + 2] = nz

        // Build line connections
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const q = pts[j]

          const qx = q.ox + Math.sin(t * q.speed * 0.25 + q.phase) * 0.18
          const qy = q.oy + Math.cos(t * q.speed * 0.18 + q.phase * 1.3) * 0.12
          const qz = q.oz + Math.sin(t * q.speed * 0.12 + q.phase * 0.7) * 0.07

          const dx = nx - qx, dy = ny - qy, dz = nz - qz
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < CONNECTION_THRESHOLD) {
            const base = lineIdx * 6
            lineArr[base]     = nx; lineArr[base + 1] = ny; lineArr[base + 2] = nz
            lineArr[base + 3] = qx; lineArr[base + 4] = qy; lineArr[base + 5] = qz
            lineIdx++
            if (lineIdx >= MAX_CONNECTIONS) break
          }
        }
        if (lineIdx >= MAX_CONNECTIONS) break
      }

      ptPos.needsUpdate = true
      linePos.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx * 2) // 2 vertices per line

      renderer.render(scene, camera)
    }

    tick()

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const nW = mount.clientWidth
      const nH = mount.clientHeight
      camera.aspect = nW / nH
      camera.updateProjectionMatrix()
      renderer.setSize(nW, nH)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    // ── Visibility pause ───────────────────────────────────────────────────
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else {
        clock.start()
        tick()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("visibilitychange", onVisibility)
      renderer.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  )
}
