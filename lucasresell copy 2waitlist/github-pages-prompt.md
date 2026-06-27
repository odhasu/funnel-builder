# GitHub Pages Deploy Prompt

Copy this entire prompt into Claude Code for any cloned Next.js website. Replace `REPO_NAME` with your repo name.

---

Convert this project from localhost to GitHub Pages. Do everything:

1. **Update next.config.ts** — change to `output: "export"`, add `basePath: "/REPO_NAME"`, add `images: { unoptimized: true }`
2. **Create GitHub repo** named `REPO_NAME` via `gh repo create REPO_NAME --public --source .`
3. **Remove old origin**, set new origin to the created repo
4. **Update package.json** — change `repository.url`, `homepage`, `bugs.url` to `https://github.com/odhasu/REPO_NAME` and `https://odhasu.github.io/REPO_NAME`
5. **Create `.github/workflows/pages.yml`**:

```
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

6. **Add `"use client"` to any component using `useEffect`, `useRef`, `useState`** that errors during build
7. **Commit and push** to master
8. **Enable Pages**: `gh api repos/odhasu/REPO_NAME/pages -X POST -f "source[branch]=master" -f "source[path]=/" -f "build_type=workflow"`
9. **Manually trigger deploy**: `gh workflow run pages.yml --repo odhasu/REPO_NAME`
10. **Confirm live** at `https://odhasu.github.io/REPO_NAME/`
