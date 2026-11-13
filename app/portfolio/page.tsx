import PortfolioClient from "./PortfolioClient"
import { PORTFOLIO_FAQ, faqJsonLd } from "@/lib/faqs"
import { portfolioBreadcrumb, portfolioPageSchema } from "@/lib/schemas/pages"

export default function PortfolioPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(PORTFOLIO_FAQ)) }} />
            <PortfolioClient />
        </>
    )
}
