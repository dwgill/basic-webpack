# Basic Webpack

This repo is a collection of my "default" webpack configuration for React
applications.

- Build production bundles with `yarn build-prod`
- Build development bundles with `yarn build-dev`
  - Run the development server with `yarn dev`
- Build bundles to inspect the webpack config with `yarn build-none`

This configuration has the following features:

- TypeScript & ES2016
- React/JSX
- Sass
- CSS modules
  - The CSS filename hashing scheme assumes that all modules will be placed in
    a directory sharing the name of the component. You can look at `App` for an
    example. The `App.tsx` module and `App.scss` file are both in a directory
    named `App`. As a result, the CSS classes are scoped something like
    `src-components-App-header__[hash]`, but the **App in the scope comes from
    the directory**.
- Splits vendor libraries out into their own bundle in production.
