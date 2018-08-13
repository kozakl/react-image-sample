const path = require('path'),
      DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
    entry: './src/Main.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            res: path.join(__dirname, 'res')
        }
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        chunkFilename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
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
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: 'public/',
        historyApiFallback: true,
        open: 'google-chrome-beta'
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify('')
            }
        })
    ]
};
