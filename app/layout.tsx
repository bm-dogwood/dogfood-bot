import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

// app/layout.tsx (add this inside the RootLayout function before return)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DOGFOOD.BOT",
    description:
      "Independent index of dog food prices, ingredients, and FDA recalls.",
    url: "https://dogfood.bot",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dogfood.bot/compare?zip={zip}",
      "query-input": "required name=zip",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
