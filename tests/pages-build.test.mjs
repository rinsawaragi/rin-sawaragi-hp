import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const mode = process.env.BUILD_MODE;

if (mode !== "production" && mode !== "staging") {
  throw new Error("BUILD_MODE must be production or staging");
}

const outputUrl = new URL("../pages-dist/", import.meta.url);
const expected =
  mode === "production"
    ? {
        base: "/",
        siteUrl: "https://rin-sawaragi.com",
        robots: "index,follow",
      }
    : {
        base: "/rin-sawaragi-hp-stg/",
        siteUrl: "https://rinsawaragi.github.io/rin-sawaragi-hp-stg",
        robots: "noindex,nofollow",
      };

async function exists(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

test(`${mode} build has environment-specific metadata`, async () => {
  const html = await readFile(new URL("index.html", outputUrl), "utf8");

  assert.match(html, /<title>Rin Sawaragi \| Composer \/ Arranger<\/title>/i);
  assert.match(html, new RegExp(`content=["']${expected.robots}["']`));
  assert.match(html, new RegExp(`href=["']${expected.siteUrl}/["']`));
  assert.match(
    html,
    new RegExp(`content=["']${expected.siteUrl}/assets/ogp\\.webp["']`),
  );
  assert.doesNotMatch(html, /rmarisias\.chatgpt\.site/);
  assert.doesNotMatch(html, /__SITE_URL__|__OG_IMAGE__|__ROBOTS__/);
});

test(`${mode} build contains GitHub Pages control files`, async () => {
  assert.equal(await exists(new URL(".nojekyll", outputUrl)), true);

  const cnameUrl = new URL("CNAME", outputUrl);
  if (mode === "production") {
    assert.equal(await readFile(cnameUrl, "utf8"), "rin-sawaragi.com\n");
  } else {
    assert.equal(await exists(cnameUrl), false);
  }
});

test(`${mode} build uses the correct asset base`, async () => {
  const html = await readFile(new URL("index.html", outputUrl), "utf8");
  const assetFiles = await readdir(new URL("assets/", outputUrl));
  const javascriptFiles = assetFiles.filter((name) => name.endsWith(".js"));

  assert.ok(javascriptFiles.length > 0, "A JavaScript bundle should be emitted");
  assert.match(
    html,
    new RegExp(`${expected.base.replaceAll("/", "\\/")}assets/[^"']+\\.js`),
  );

  const javascript = (
    await Promise.all(
      javascriptFiles.map((name) =>
        readFile(new URL(`assets/${name}`, outputUrl), "utf8"),
      ),
    )
  ).join("\n");

  assert.ok(
    javascript.includes(`${expected.base}assets/`),
    `The JavaScript bundle should use ${expected.base} as its asset base`,
  );
  assert.ok(
    javascript.includes("rin-sawaragi-character.png"),
    "The character image should be referenced by the JavaScript bundle",
  );
  assert.match(javascript, new RegExp(expected.siteUrl.replaceAll("/", "\\/")));
  assert.doesNotMatch(javascript, /rmarisias\.chatgpt\.site/);

  for (const filename of [
    "rs-logo.png",
    "rin-sawaragi-character.png",
    "ogp.webp",
  ]) {
    assert.equal(await exists(new URL(`assets/${filename}`, outputUrl)), true);
  }
});
