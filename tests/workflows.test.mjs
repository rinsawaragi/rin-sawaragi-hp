import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productionWorkflowUrl = new URL(
  "../.github/workflows/deploy-production.yml",
  import.meta.url,
);
const stagingWorkflowUrl = new URL(
  "../.github/workflows/deploy-staging.yml",
  import.meta.url,
);

test("Production deploys only main with the official Pages actions", async () => {
  const workflow = await readFile(productionWorkflowUrl, "utf8");

  assert.match(workflow, /branches:\s*\n\s*- main/);
  assert.match(workflow, /if: github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /actions\/setup-node@v6/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /npm run build:production/);
  assert.doesNotMatch(workflow, /refs\/heads\/develop|build:staging/);
});

test("Staging deploys only develop to the output repository", async () => {
  const workflow = await readFile(stagingWorkflowUrl, "utf8");

  assert.match(workflow, /branches:\s*\n\s*- develop/);
  assert.match(workflow, /if: github\.ref == 'refs\/heads\/develop'/);
  assert.match(workflow, /npm run build:staging/);
  assert.match(workflow, /actions\/setup-node@v6/);
  assert.match(workflow, /rinsawaragi\/rin-sawaragi-hp-stg\.git/);
  assert.match(workflow, /secrets\.STAGING_DEPLOY_KEY/);
  assert.match(workflow, /git push origin main/);
  assert.doesNotMatch(workflow, /build:production|deploy-pages|CNAME/);
});
