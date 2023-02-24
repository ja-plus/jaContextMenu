// import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // 代码压缩
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/ja-contextmenu.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'lib/ja-contextmenu.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
    // {
    //   file: 'lib/index.es5.js',
    //   format: 'esm',
    //   sourcemap: true,
    //   plugins: [
    //     getBabelOutputPlugin({
    //       presets: ['@babel/preset-env'],
    //     }),
    //   ],
    // },
    // {
    //   file: 'lib/index.es5.min.js',
    //   format: 'esm',
    //   sourcemap: true,
    //   plugins: [
    //     getBabelOutputPlugin({
    //       presets: ['@babel/preset-env'],
    //     }),
    //     uglify(),
    //   ],
    // },
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: './types'
    }),
    // getBabelOutputPlugin({
    //   presets: ['@babel/preset-env'],
    // }),
    // babel({
    //   exclude: 'node_modules/**', // 只编译我们的源代码
    //   babelHelpers: 'runtime',
    // }),
  ],
};
