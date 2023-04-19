function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND": {
            return "Электронный адрес не зарегистрирован, либо пользователь был удален.";
        }

        case "INVALID_PASSWORD": {
            return "Неверно введен пароль";
        }
        case "USER_DISABLED": {
            return "Учетная запись пользователя отключена администратором";
        }
        default:
            return "Слишком много попытох входа. попробуйте позднее";
    }
}

export default generateAuthError;
