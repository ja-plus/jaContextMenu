import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify'; // 代码压缩
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'lib/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [uglify()],
    },
    {
      file: 'lib/index.es5.js',
      format: 'esm',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
        }),
      ],
    },
    {
      file: 'lib/index.es5.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
        }),
        uglify(),
      ],
    },
  ],
  plugins: [
    typescript(),
    // getBabelOutputPlugin({
    //   presets: ['@babel/preset-env'],
    // }),
    // babel({
    //   exclude: 'node_modules/**', // 只编译我们的源代码
    //   babelHelpers: 'runtime',
    // }),
  ],
};
