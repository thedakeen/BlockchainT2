const { body } = require('express-validator');

const registerValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5}),
    body('name', "Имя может быть минимум 3 символа").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка").optional().isURL(),
]

const loginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пустая ячейка").isLength({min: 1}),
]

module.exports = {
    registerValidator,
    loginValidator
}