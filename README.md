# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## development

### UI modules for developing UI

flowbite-vue module，which relies on tailwind css, can be used to develop UI

https://flowbite-vue.com/components/carousel

### structure of project

 /components, all UI code used more than once can be extracted to a component 
 
 /server, all api calls will be put in the sub directory of /api
 
 /mockdatabase, mocking data， will be removed after backend finished
 
 /pages, all pages can be put here and will be automatically routed through structure of a directory, like <Nuxtlink to="/" /> will be routed to /index/index.vue


