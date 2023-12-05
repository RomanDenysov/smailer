const ApiError = require('../exceptions/apiError');
const userService = require('../services/userService');
const {validationResult} = require('express-validator')

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest(`Ошибка при валидации`, errors.array()))
            }
            const { username, email, password } = req.body;
            const userData = await userService.registration(username, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            console.log(`Пользователь ${username} - успешно создан`)
            return res.json(userData)
        } catch (err){
            console.log(`Проблема в регистрации: ${err}`)
            next(err)
        }
    }
    async login (req, res, next) {
        try {
            const { email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            console.log(`Вход пользователя с email: ${email} - успешно осуществлен`)
            return res.status(201).json(userData)
            
        } catch (err) {
            console.log(`Проблема во время входа/логина: ${err}`)
            next(err);
        }
    }
    async logout (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            console.log(`Пользователь покинул приложение`)
            return res.status(200).json(token);
        } catch (err) {
            console.log(`Проблема во время выхода/логаута: ${err}`)
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            console.log(`Рефреш токена - успешно осуществлен`)
            return res.json(userData)
        } catch (err) {
            console.log(`Проблема во время рефреша токена: ${err}`)
            next(err);
        }
    }
}

module.exports = new UserController();
