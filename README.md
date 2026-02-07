# End-to-End Demo — Playwright Multi-Site Tests

Playwright TypeScript project for testing multiple independent websites. Each site is a separate **project** with its own `baseURL`; tests run in **parallel** by default.

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

```bash
npm install
npx playwright install
```

This installs dependencies and the Playwright browsers (Chromium, Firefox, WebKit).

## Running Tests

### All sites (all projects)

Run every project in parallel:

```bash
npm test
```

Or explicitly:

```bash
npx playwright test
```

### Single site

Run only one site by project name:

| Site        | Command |
|------------|---------|
| lolesports | `npm run test:lolesports` or `npx playwright test --project=lolesports` |
| visir      | `npm run test:visir` or `npx playwright test --project=visir` |
| google     | `npm run test:google` or `npx playwright test --project=google` |
| loldle     | `npm run test:loldle` or `npx playwright test --project=loldle` |

### By path

Run tests in a specific folder:

```bash
npx playwright test tests/google
npx playwright test tests/lolesports/load.spec.ts
```

### Other options

- **Headed (see browser):** `npm run test:headed` or `npx playwright test --headed`
- **UI mode:** `npx playwright test --ui`
- **Debug:** `npx playwright test --debug`
- **Report:** `npm run report` (opens last HTML report)

## Project structure

```
├── pages/
│   └── PageManager.ts    # Base page helper (e.g. body visibility)
├── tests/
│   ├── lolesports/
│   │   └── load.spec.ts
│   ├── visir/
│   │   └── load.spec.ts
│   ├── google/
│   │   └── load.spec.ts
│   └── loldle/
│       └── load.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Config overview

- **Projects:** One project per site (`lolesports`, `visir`, `google`, `loldle`) with its own `baseURL` and `testMatch` for that site’s folder.
- **Parallel execution:** `fullyParallel: true`; workers and retries are set for local vs CI.

## Load tests

Each site has a `load.spec.ts` that:

1. Navigates to `/`
2. Asserts the response status is **200**
3. Asserts the **`<body>`** element is visible

Use `PageManager` in `pages/PageManager.ts` for shared behavior (e.g. body visibility); add site-specific POMs under `pages/` as needed.
