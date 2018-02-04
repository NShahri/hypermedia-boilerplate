export default {
    appName: 'hypermedia-api',
    logLevel: 'trace',

    serverPort: 8080,
    serverBaseUrl: 'http://localhost:8080',

    isProduction: process.env.NODE_ENV === 'production'
}