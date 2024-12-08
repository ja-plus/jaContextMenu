import { defineConfig } from 'vite';

export default defineConfig({
  //add test to vite config
  test: {
    // ...
    environment: 'happy-dom',
  },
});
