const jwt = require('jsonwebtoken')
const Token = require('../models/TokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SEC, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SEC, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SEC);
            return userData
        } catch (err) {
            console.log(`Ошибка при валидации AccessToken: ${err}`)
            return null;
        }
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SEC);
            return userData
        } catch (err) {
            console.log(`Ошибка при валидации RefreshToken: ${err}`)
            return null;
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({userId: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await Token.create({userId: userId, refreshToken})
        return token;
    }
    
    async removeToken(refreshToken) {
        return await Token.findOneAndDelete({ refreshToken });
    }   

    async findToken(refreshToken) {
        return await Token.findOneAndUpdate({ refreshToken });
    }   
}

module.exports = new TokenService();