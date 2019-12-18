// These following lines configure TypeScript to recognize css & scss files as
// something you can import (which we can, because of CSS modules).
// It doesn't fix actually typing the individual CSS modules, which is instead
// handled by the css-modules-typescript-loader webpack loader.
declare module '*.scss';
declare module '*.css';