import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

type DeploymentMode = "development" | "staging" | "production";

const deployments = {
  development: {
    base: "/",
    siteUrl: "http://localhost:5173",
    robots: "noindex,nofollow",
  },
  staging: {
    base: "/rin-sawaragi-hp-stg/",
    siteUrl: "https://rinsawaragi.github.io/rin-sawaragi-hp-stg",
    robots: "noindex,nofollow",
  },
  production: {
    base: "/",
    siteUrl: "https://rin-sawaragi.com",
    robots: "index,follow",
  },
} as const;

function pagesMetadata(mode: DeploymentMode): Plugin {
  const deployment = deployments[mode];
  const ogImage = `${deployment.siteUrl}/assets/ogp.webp`;

  return {
    name: "github-pages-metadata",
    transformIndexHtml(html) {
      return html
        .replaceAll("__SITE_URL__", deployment.siteUrl)
        .replaceAll("__OG_IMAGE__", ogImage)
        .replaceAll("__ROBOTS__", deployment.robots);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: ".nojekyll", source: "" });

      if (mode === "production") {
        this.emitFile({
          type: "asset",
          fileName: "CNAME",
          source: "rin-sawaragi.com\n",
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const deploymentMode: DeploymentMode =
    mode === "staging" || mode === "production" ? mode : "development";
  const deployment = deployments[deploymentMode];

  return {
    base: deployment.base,
    publicDir: "public",
    plugins: [react(), pagesMetadata(deploymentMode)],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(deployment.siteUrl),
    },
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
    },
    preview: {
      host: "127.0.0.1",
      port: 4173,
      strictPort: true,
    },
    build: {
      outDir: "pages-dist",
      emptyOutDir: true,
    },
  };
});
