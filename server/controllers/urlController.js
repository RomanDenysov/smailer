const ApiError = require('../exceptions/apiError');
const UrlService = require("../services/urlService");
const {validationResult} = require('express-validator')


class UrlController {
    async createUrl(req, res, next) {
        console.log('Request Body', req.body, req.user)
        
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return next(ApiError.BadRequest(`Ошибка при валидации`, errors.array()))
        }
        
            const { url } = req.body;
            if (!url) {
                return next(ApiError.BadRequest(`Ошибка при валидации: 'originalUrl' is required`));
            }
        const userId = req.user.id;
        const { username } = req.user;

        try {
            const result = await UrlService.createUrl(url, userId, username)
            console.log(`Укороченная ссылка успешно создана: ${result} `)
            return res.json(result)
        } catch (err) {
            console.log(`Ошибка при сокращении ссылки: ${err} `)
            next(err)
        }
    }

    async removeUrl(req, res, next) {
        const shortUrl = req.params.shortUrl;
        
        try {
            const result = await UrlService.removeUrl(shortUrl);
            if (result.deletedCount > 0) {
                return res.json({ message: `Ссылка ${shortUrl} успешно удалена` });
            } else {
                return next(ApiError.BadRequest( `Ссылка ${shortUrl} успешно удалена`, errors.array() ));
            }
        } catch (err) {
            console.log(`Ошибка при удалении ссылки: ${err} `)
            next(err)
        }
    }

    async getAllUrl(req, res, next) {
        console.log(req.user.id)
        const userId = req.user.id
        try {
            const result = await UrlService.getAllUrl(userId);

            if (!result || result.length === 0) {
                return res.json({ message: "У вас отсутвтуют какие-либо ссылки, попробуйте создать новую!" });
            }

            console.log(`Список ссылок успешно получен`, result)
            return res.json(result)
        } catch (err) {
            console.log(`Ошибка при вызове списка ссылок: ${err} `)
            next(err)
        }
    }
        

}

module.exports = new UrlController();