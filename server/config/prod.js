module.exports = {
    mongoURI: process.env.MONGO_URI,
    puppeteer: {
        launchOptions: {
            headless: true,
            args: [
                '--enable-features=NetworkService,NetworkServiceInProcess'
                ,'--disable-setuid-sandbox'
                ,'--no-sandbox'
                ,'--no-zygote'
            ]
        }
    }
}