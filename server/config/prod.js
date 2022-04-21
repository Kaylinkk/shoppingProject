module.exports = {
    mongoURI: process.env.MONGO_URI,
    puppeteer: {
        launchOptions: {
            headless: true,
        }
    }
}