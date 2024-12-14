import { defineConfig } from 'vite';

export default defineConfig({
  //add test to vite config
  test: {
    // ...
    environment: 'happy-dom',
    coverage: {
      provider: 'v8', // or 'istanbul'
      clean: true,
      include: ['src/**/*.{js,ts}'],
    },
  },
});
