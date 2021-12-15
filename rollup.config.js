import babel from '@rollup/plugin-babel';
export default {
  input: 'src/jaContextMenu.js',
  output: {
    file: 'lib/index.esm.js',
    format: 'es',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
  ],
};
