import { default as babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify'; // 代码压缩
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.esm.js',
      format: 'esm',
    },
    {
      file: 'lib/index.esm.min.js',
      format: 'esm',
      plugins: [uglify()],
    },
    {
      file: 'lib/index.es5.js',
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
        }),
      ],
    },
    {
      file: 'lib/index.es5.min.js',
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
        }),
        uglify(),
      ],
    },
  ],
  plugins: [
    // getBabelOutputPlugin({
    //   presets: ['@babel/preset-env'],
    // }),
    // babel({
    //   exclude: 'node_modules/**', // 只编译我们的源代码
    //   babelHelpers: 'runtime',
    // }),
  ],
};
