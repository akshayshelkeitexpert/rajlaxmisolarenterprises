Deployment :
pnpm build

# Mahesh eBusiness (Angular)

Angular **19** SPA using the **eBusiness** Bootstrap template (RajlaxmiSolarEnterprises).

## Prerequisites

- **fnm** / Node: project was generated with Node **22.x** compatible with Angular 19 (`fnm` 1.38+).
- Install deps: `npm install`

## Commands

- `npm start` — dev server (`http://localhost:4200`)
- `npm run build` — production build → `dist/RajlaxmiSolarEnterprises`

## Structure

- `src/app/layout/` — header & footer (global chrome)
- `src/app/pages/` — `home`, `about`, `services`, `contact`
- `src/assets/` — template assets (images, vendors, CSS, `main-angular.js`)
- `src/app/core/ebusiness-widgets.service.ts` — re-inits Swiper, AOS, Isotope, GLightbox, PureCounter after each route change (required for SPA)

Original static template files remain in `eBusiness/` for reference; the running site uses `src/assets/`.

## Next steps (content)

Replace placeholder text, logo, and contact details in:

- `src/app/layout/app-header.component.html`
- `src/app/layout/app-footer.component.html`
- `src/app/pages/*/*.html`

Forms point to `/assets/forms/*.php` — swap for an API or Angular service when you deploy (static hosts won’t run PHP).

## License

Respect [RajlaxmiSolarEnterprises eBusiness license](https://RajlaxmiSolarEnterprises.com/license/) for the template assets.



First commit 
git init && git add . && git status --short | head -50 && echo "..." && git status --short | wc -l


git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "$(cat <<'EOF' Initial commit: Rajlaxmi Solar Enterprises Angular site. Angular 19 SPA with eBusiness template — home, services, contact, legal pages, and solar distribution content.EOF)" && git branch -M main && git remote add origin https://github.com/akshayshelkeitexpert/rajlaxmisolarenterprises.git


git pull origin main --allow-unrelated-histories --no-rebase -X ours -m "Merge remote placeholder README" 2>&1

git fetch origin main && git merge origin/main --allow-unrelated-histories -X ours -m "Merge remote placeholder README" 2>&1

git push -u origin main 2>&1

gh auth status 2>&1; which gh 2>&1

git status && git log --oneline -3 && git remote -v