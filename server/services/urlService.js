const shortid = require("shortid");
const ShortUrl = require("../models/UrlModel");
const UrlDto = require("../dtos/urlDto");

class UrlService {
    async createUrl(originalUrl, userId, username) {
        try {
            const code = shortid.generate()
            const shortUrl = `${process.env.API_URL}/t/${code}`
            const url = await ShortUrl.create({ originalUrl, shortUrl, userId, code})
            return new UrlDto(url);
        } catch (err) {
            console.log(`Проблема находиться на уровне сервиса: ${err}`)
        }
    }

    async removeUrl(shortUrl) {
        const url = await ShortUrl.deleteOne({ shortUrl });
        return url;
    }

    async getOriginalUrl(code) {
        const url = await ShortUrl.findOne({ code })
        return url;
    }

    async getAllUrl(userId) {
        const urls = await ShortUrl.find({ userId })
        if(urls.length === 0){
            return null;
        }
        console.log(urls)
        
        return urls
    }
}

module.exports = new UrlService();