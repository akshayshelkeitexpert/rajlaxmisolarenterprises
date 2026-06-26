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
