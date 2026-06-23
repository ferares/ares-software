# [Ares Software](https://ares.uy)

Work portfolio/presentation

Developed using [Astro](https://astro.build) + [WebComponents](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [PHP](https://php.net) for a backend script to handle contact form submissions.

## Top level dependencies

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [PHP](https://php.net)
- [Composer](https://getcomposer.org/)

## Development

1. Create a copy of `.env.example` and name it `.env` replacing the variables values where needed.
1. Install dependencies `pnpm i` & `composer install`.
1. Run the development server `pnpm dev` & `composer run-script dev`.
1. Open [http://localhost:4321](http://localhost:4321) with your browser to see the site.

## Commands

The following commands are available once you install [Node.js](https://nodejs.org) & [pnpm](https://pnpm.io):

- `pnpm dev` - Runs the development server.
- `pnpm build` - Builds the project for production.
- `pnpm preview` - Previews the production build.
- `pnpm astro` - Run Astro commands.
- `composer run-script dev` - Run a PHP development server for the contact form submission handler.
