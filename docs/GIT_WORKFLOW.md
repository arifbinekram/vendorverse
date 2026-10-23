# VendorVerse — Git Workflow (Team QuadCore)

সব command **Git Bash**-এ চলবে (Windows)। Linux/macOS terminal-এও হুবহু একই command।

## ১. পাঁচটা নিয়ম

1. `main`-এ সরাসরি commit বা push নয় — `main`-এ সবসময় চালু (working) code থাকবে।
2. প্রতিটা কাজের জন্য নতুন branch।
3. কাজ শেষে push → Pull Request (PR) → CI সবুজ ✓ → একজন teammate review → Merge।
4. Commit message: `type(scope): message` (নিচে দেখুন)।
5. `.env`, password, API key, token **কখনো commit নয়** — একবার GitHub-এ উঠলে history থেকে মোছা কঠিন।

## ২. Branch-এর নাম

| শুরু | কখন | উদাহরণ |
| --- | --- | --- |
| `feature/` | নতুন page বা feature | `feature/homepage`, `feature/product-page` |
| `fix/` | bug ঠিক করা | `fix/cart-badge-overflow` |
| `docs/` | শুধু লেখা/ডকুমেন্ট | `docs/api-guide` |
| `chore/` | setup, package update | `chore/update-deps` |

## ৩. Commit message

```
type(scope): short message in English
```

| type | মানে |
| --- | --- |
| `feat` | নতুন feature |
| `fix` | bug fix |
| `style` | শুধু design/CSS |
| `refactor` | কাজ একই, code গোছানো |
| `docs` | README/ডকুমেন্ট |
| `chore` | setup, config, package |
| `test` | test যোগ |
| `ci` | GitHub Actions |

উদাহরণ: `feat(home): add flash sale countdown` · `fix(header): stop cart badge overflow on tablet`

## ৪. প্রতিদিনের কাজ (শুরু থেকে merge পর্যন্ত)

```bash
# ১) main-কে GitHub-এর সাথে মিলিয়ে নিন
git switch main
git pull origin main

# ২) নতুন branch বানিয়ে সেখানে যান
git switch -c feature/product-page

# ৩) কাজ করুন… তারপর দেখুন কী কী বদলেছে
git status
git diff

# ৪) নির্দিষ্ট file/folder add করে commit
git add frontend/src/app/products
git commit -m "feat(product): add product details page"

# ৫) GitHub-এ পাঠান (প্রথম push-এ -u লাগে)
git push -u origin feature/product-page

# ৬) GitHub-এ "Compare & pull request" → PR খুলুন → CI ✓ হলে review → Merge

# ৭) merge-এর পরে local পরিষ্কার
git switch main
git pull origin main
git branch -d feature/product-page
```

## ৫. অন্যের কাজ `main`-এ ঢুকেছে — নিজের branch আপডেট করা

```bash
git switch feature/product-page
git fetch origin
git merge origin/main
# conflict হলে: VS Code-এ file ঠিক করুন → git add <file> → git commit
git push
```

## ৬. Push rejected (`fetch first` / `non-fast-forward`)

GitHub-এ আপনার branch-এ এমন commit আছে যা আপনার PC-তে নেই। আগে নামিয়ে তারপর push:

```bash
git pull --rebase origin feature/product-page
git push
```

## ৭. কখনো করবেন না

- `git push --force` (বিশেষ করে `main`-এ)
- `node_modules/`, `.next/`, `.env` commit — `.gitignore` এগুলো আটকায়, তবু commit-এর আগে `git status` দেখুন
- অন্যের folder-এ না জানিয়ে বড় পরিবর্তন — করলে PR-এর বর্ণনায় লিখুন

## ৮. Issue → Branch → PR

GitHub **Issues**-এ প্রতিটা কাজের একটা issue খুলুন (যেমন `#7 Product details page`)।
PR-এর বর্ণনায় `Closes #7` লিখলে merge হওয়ার সাথে সাথে issue নিজে থেকে বন্ধ হয়।
