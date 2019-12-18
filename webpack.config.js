const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const isProd = argv.mode === 'production';
    const rootDir = path.resolve(__dirname);

    let cssLoaders, jsLoaders;
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
                },
                {
                    test: /\.css$/,
                    loader: (cssLoaders = [
                        isDev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: isDev
                                        ? '[path][name]__[local]'
                                        : '[hash:base64]',
                                }
                            }
                        },
                    ])
                },
                {
                    test: /\.scss$/,
                    loader: cssLoaders.concat('sass-loader'),
                },
                {
                    test: /\.jsx?$/,
                    loader: (jsLoaders = [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }])
                },
                {
                    test: /\.tsx?/,
                    loader: jsLoaders.concat('ts-loader'),
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(rootDir, 'src/index.hbs'),
                title: "Hello World!"
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? 'bundle.css' : 'bundle.[contenthash].css',
            }),
        ]
    };
}