export default {
    appName: 'hypermedia-api',
    logLevel: 'trace',

    serverPort: 8080,
    serverBaseUrl: 'http://localhost:8080/',

    allowedOrigin: ['http://localhost:3000'],

    isProduction: process.env.NODE_ENV === 'production'
}