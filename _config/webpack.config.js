const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ];
    }

    return config;
}

module.exports = {
    context: path.resolve(__dirname, './../src'),
    entry: ['@babel/polyfill', './js/main.js'],
    output: {
        filename: isDev ? '[name].js' : '[name].[hash].js',
        path: path.resolve(__dirname, './../dist'),
        assetModuleFilename: isDev ? 'assets/[name][ext][query]' : 'assets/[name].[hash][ext][query]',
        clean: true,
    },
    target: isDev ? 'web' : 'browserslist',
    optimization: optimization(),
    devServer: {
        port: isDev ? 4200 : 4201,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: isProd ? 'asset' : 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                    }
                }
            }
        ]
    },
    resolve: {
        roots: [path.resolve(__dirname, "./../src/assets")],
    },
    performance: {
        hints: isDev ? false : 'warning'
    }
};
