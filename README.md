# Tefrix Solutions

Website for Tefrix Solutions: a single [Next.js](https://nextjs.org) app (App Router) that serves both the frontend and the backend. The UI is built with [Mantine](https://mantine.dev), and backend endpoints are Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) under `app/api/`.

## Getting started

Requires Node.js 20.9+ and pnpm.

```sh
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start the development server         |
| `pnpm build`       | Create a production build            |
| `pnpm start`       | Serve the production build           |
| `pnpm lint`        | Run ESLint                           |
| `pnpm check-types` | Type-check with `tsc --noEmit`       |
| `pnpm format`      | Format `.ts`, `.tsx` and `.md` files |
