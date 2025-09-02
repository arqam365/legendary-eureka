"use client";

import {JSX} from "react";

export type ToggleSwitchProps = {
    id?: string;
    checked: boolean;
    disabled?: boolean;
    onCheckedChange: (v: boolean) => void;
    ariaDescribedBy?: string; // camelCase prop
    className?: string;
};

export default function ToggleSwitch({
                                         id,
                                         checked,
                                         disabled,
                                         onCheckedChange,
                                         ariaDescribedBy,
                                         className = "",
                                     }: ToggleSwitchProps): JSX.Element {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            aria-describedby={ariaDescribedBy}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={[
                "relative inline-flex h-6 w-11 items-center rounded-full transition",
                disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                checked ? "bg-primary" : "bg-gray-300",
                className,
            ].join(" ")}
        >
      <span
          className={[
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
              checked ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
      />
        </button>
    );
}