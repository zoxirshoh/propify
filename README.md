# Propify

A responsive real-estate listings web app for browsing properties to buy or rent.

**Live demo:** _coming soon_

## Features

- **Property search & filters**: search by title, location or city; filter by buy/rent status, property type, price range and bedrooms; sort results. Filters live in the URL, so filtered views can be shared and bookmarked.
- **Property detail pages** with dynamic routing (`/property/:id`)
- **Favorites**: save properties and view them on a dedicated page (persisted in `localStorage`)
- **Mortgage calculator**: estimate monthly payments
- **Light / dark mode**: follows the system preference and remembers your choice
- **Demo login**, toast notifications, loading screen and a custom 404 page
- Fully responsive layout with a mobile filter drawer

## Tech stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- React Context API for global state (favorites, theme, user, toasts)
- Plain CSS
- Deployed on [Vercel](https://vercel.com/) (SPA rewrites in `vercel.json`)

## Project structure

```
src/
  components/   Reusable UI (Header, PropertyCard, MortgageCalculator, Toast, ...)
  context/      AppProvider: favorites, theme, auth and notifications
  data/         Property data
  pages/        Home, Properties, PropertyDetail, Favorites, About, Contact, Login, NotFound
  utils/        Formatting and localStorage helpers
```

## Getting started

```bash
git clone https://github.com/zoxirshoh/propify.git
cd propify
npm install
npm run dev
```

Other scripts: `npm run build` (production build), `npm run preview` (preview the build), `npm run lint`.

## Author

**Zohirshoh Rahmonberdiyev**: frontend developer from Namangan, Uzbekistan.
[GitHub](https://github.com/zoxirshoh)
