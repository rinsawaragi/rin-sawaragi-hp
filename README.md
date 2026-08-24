# Rin Sawaragi Official Website

Rin Sawaragi公式サイトのソースリポジトリです。GitHub Pagesを使い、ProductionとStagingを明確に分離して運用します。

## Environment

| Environment | URL | Source | Deploy |
| --- | --- | --- | --- |
| Local | `http://localhost:5173/` | 作業中の`feature/*` | 手動起動 |
| Staging | `https://rinsawaragi.github.io/rin-sawaragi-hp-stg/` | `develop` | Staging出力専用リポジトリの`main`へ配布 |
| Production | `https://rin-sawaragi.com/` | `main` | GitHub Pages公式Actions |

Productionは`main`、Stagingは`develop`だけを配布元とします。StagingからProductionへの自動昇格は行いません。

## Local

必要な環境はNode.js 22.13.0以上とnpmです。初回は依存関係を固定済みのlockfileからインストールします。

```sh
npm ci
npm run dev
```

ブラウザで `http://localhost:5173/` を開きます。

Production相当のビルドと確認:

```sh
npm run build:production
npm run preview
```

Staging相当のビルドと確認:

```sh
npm run build:staging
npm run preview:staging
```

品質確認:

```sh
npm run lint
npm test
```

GitHub Pages向けの出力先は`pages-dist/`です。Productionビルドだけが`CNAME`を含み、Stagingビルドは`/rin-sawaragi-hp-stg/`を基準に画像やJavaScriptを参照します。

## Branch workflow

```text
feature/* -> Local確認 -> develop -> Staging確認 -> 人による承認 -> main -> Production
```

- 作業は必ず`feature/*`ブランチで行います。
- Local確認後に`develop`へ取り込みます。
- `develop`へのpushでStagingを更新します。
- Stagingの目視確認と承認を終えるまで`main`へ取り込みません。
- `main`へのpushでProductionを更新します。
- `main`上で直接作業しません。

## Deployment mapping

### Production

`.github/workflows/deploy-production.yml`が`main`へのpushで動作します。公式のGitHub Pages Actionsを使い、Productionビルドを`github-pages`環境へ配布します。

GitHubのSource Repository `rinsawaragi/rin-sawaragi-hp` では、以下を一度だけ設定します。

1. `Settings > Pages > Build and deployment > Source`を`GitHub Actions`にする。
2. `Custom domain`に`rin-sawaragi.com`を設定する。
3. 証明書の発行後に`Enforce HTTPS`を有効にする。

カスタムActionsを使用する場合、ビルド内の`CNAME`だけではGitHub側のCustom domain設定は完了しません。

### Staging

`.github/workflows/deploy-staging.yml`が`develop`へのpushで動作し、ビルド済みファイルだけを `rinsawaragi/rin-sawaragi-hp-stg` の`main`へ送ります。Stagingリポジトリは出力専用で、ソースコードの作業場所にはしません。

Stagingを有効にするための一度限りの設定:

1. 公開リポジトリ `rinsawaragi/rin-sawaragi-hp-stg` を作成する。
2. 書き込み可能なDeploy keyをStagingリポジトリへ登録する。
3. 対応する秘密鍵をSource RepositoryのActions secret `STAGING_DEPLOY_KEY`へ登録する。
4. Stagingリポジトリの`Settings > Pages`で`Deploy from a branch`、`main`、`/(root)`を選ぶ。

Stagingには独自ドメインや`CNAME`を設定しません。

GitHub Freeで費用を発生させずにPagesを利用する場合、Source RepositoryとStagingリポジトリはいずれもPublicリポジトリとして運用します。

## DNS

DNSはお名前.comで管理し、このリポジトリやActionsからは変更しません。ProductionのGitHub Pages向け設定値は以下です。

```text
@  A      185.199.108.153
@  A      185.199.109.153
@  A      185.199.110.153
@  A      185.199.111.153
www CNAME rinsawaragi.github.io
```

IPv6を使用する場合は、以下のGitHub Pages公式AAAAレコードも追加できます。

```text
@  AAAA   2606:50c0:8000::153
@  AAAA   2606:50c0:8001::153
@  AAAA   2606:50c0:8002::153
@  AAAA   2606:50c0:8003::153
```

## Content and assets

公開後に差し替える情報は`app/site-data.ts`に集約しています。

- SNS・YouTube・Twitch・問い合わせフォームのURL
- Featured / Newest作品、YouTube ID、Role
- Packages / Optionsの価格と説明
- 現在の納期目安
- ロゴ、立ち絵、OGP画像の参照先

画像アセットは`public/assets/`に配置します。画像の縦横比を維持し、内容を改変しないでください。

## Existing private preview

既存のSites/Vinext版は削除せず、次のコマンドで確認できます。GitHub PagesのProduction／Staging配布には使用しません。

```sh
npm run dev:sites
npm run build:sites
npm run test:sites
```
