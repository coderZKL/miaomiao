module.exports = {
    devServer: {
        proxy: {
            '/asgard': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/ajax': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/dianying': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
        }
    }
}