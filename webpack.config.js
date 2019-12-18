const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const isProd = argv.mode === 'development';
    const rootDir = path.resolve(__dirname);

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(rootDir, 'dist'),
            filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
            publicPath: "",
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: ['handlebars-loader'],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(rootDir, 'src/index.hbs'),
                title: "Hello World!"
            })
        ]
    };
}