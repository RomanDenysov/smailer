const ApiError = require("../exceptions/apiError");
const User = require("../models/UserModel");
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const TokenService = require('./tokenService')
const UserDto = require('../dtos/userDto');



class UserService {
    async registration(username, email, password) {
        const candidate = await User.findOne({ email })
        if(candidate) {
            throw ApiError.BadRequest('Пользователь с таким EMAIL уже существует')
        }

        const hashPass = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()
        const user = await User.create({username, email, password: hashPass, activationLink})

        const userDto = new UserDto(user); // id, username, email, role, isActivated
        const tokens = TokenService.generateTokens( {...userDto} );
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await User.findOne({ email })
        if(!user) {
            throw ApiError.BadRequest('Пользователь с таким EMAIL не был найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens( {...userDto} );
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            console.log(`Рефреш токен для обновления отсутствует`)
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens( {...userDto} );
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

module.exports = new UserService();