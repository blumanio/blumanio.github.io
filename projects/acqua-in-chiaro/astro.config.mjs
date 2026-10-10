import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://blumanio.github.io',base:'/projects/acqua-in-chiaro/',trailingSlash:'always',output:'static',outDir:'./.build',integrations:[react()],build:{assets:'assets-app'},vite:{plugins:[tailwindcss()]}});
