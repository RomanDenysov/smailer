const urlService = require("../services/urlService")

class RedirectController {
    async redirectToOriginal(req, res, next) {
        try {
            console.log(req.params)
            const { code } = req.params
            if(!code) {
                return next(ApiError.BadRequest(`Ошибка на этапе получения code для редиректа`, errors.array()))
            }
            const url = await urlService.getOriginalUrl(code);
            if(!url){
                return next(ApiError.BadRequest(`Ссылка не была найдена`, errors.array()))
            }

            url.clicks += 1;
            await url.save();
            console.log('+1 к статистике')
            
            res.redirect(url.originalUrl);

        } catch (err) {
            console.error(`Ошибка при редиректе на оригинальную ссылку: ${err}`);
            next(err);
        }
    }
}

module.exports = new RedirectController()