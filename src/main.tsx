import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SiteClient } from "../app/site-client";
import { siteData } from "../app/site-data";
import "../app/globals.css";
import "./github-pages.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteData.brand.name,
  jobTitle: siteData.brand.title,
  url: siteData.siteUrl,
};

const structuredDataScript = document.createElement("script");
structuredDataScript.type = "application/ld+json";
structuredDataScript.text = JSON.stringify(structuredData);
document.head.append(structuredDataScript);

createRoot(root).render(
  <StrictMode>
    <SiteClient />
  </StrictMode>,
);
