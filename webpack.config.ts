import path from "path";
import nodeExternals from "webpack-node-externals";
import TerserPlugin from "terser-webpack-plugin";

export default {
  mode: "production",
  entry: "./dist/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname),
    filename: `edugate.js`,
    libraryTarget: "var",
    library: "app",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Оставляем console.log если нужно
          },
          format: {
            comments: /@swagger|@openapi/i, // Сохраняем только swagger комментарии
          },
          mangle: false, // Отключаем обфускацию имен
        },
        extractComments: false,
      }),
    ],
  },
};
