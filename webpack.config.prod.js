const path = require('path'),
      BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
    entry: './src/Main.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            lib: path.join(__dirname, 'lib'),
            res: path.join(__dirname, 'res')
        }
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.pcss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]__[hash:base64:10]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                use: ['url-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify('')
            }
        }),
        process.argv.includes('--analyzer') &&
            new BundleAnalyzerPlugin()
    ]
};
