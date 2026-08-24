import { SiteClient } from "./site-client";
import { siteData } from "./site-data";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteData.brand.name,
    jobTitle: siteData.brand.title,
    url: siteData.siteUrl,
  };

  return (
    <>
      <SiteClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
