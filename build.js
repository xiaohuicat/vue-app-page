const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.js'],
  outfile: './dist/app-page.js',
  bundle: true,
  // minify: true,
  platform: 'browser', // 设置为浏览器平台
  format: 'esm', // 输出为 ES6 模块格式
  external: ['@vue/runtime-dom', '@vue/devtools-api'], // 将这些依赖项标记为外部模块
}).catch(() => process.exit(1));
