import React, { useEffect, useState } from "react";
import CheckboxField from "../common/form/checkboxField";
import TextField from "../common/form/textField";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, LogIn } from "../../store/users";
const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одну цифру"
            )
            // .matches(
            //     /(?=.*[!@%^*_])/,
            //     "Пароль должен содержать хотя бы один специальный символ из !@%^*_"
            // )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять минимум из 8 символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно")
    });

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((error) => setErrors({ [error.path]: error.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const { email, password } = data;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        const newData = {
            email,
            password,
            redirect
        };
        dispatch(LogIn(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckboxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckboxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;

// import { validator } from "../../utils/validator";

// const validatorConfig = {
//     email: {
//         isRequired: {
//             message: "Электронная почта обязательна для заполнения"
//         },
//         isEmail: {
//             message: "Email введен некорректно"
//         }
//     },
//     password: {
//         isRequired: {
//             message: "Пароль обязателен для заполнения"
//         },
//         isCapitalSymbol: {
//             message: "Пароль должен содержать хотя бы одну заглавную букву"
//         },
//         isContaindigit: {
//             message: "Пароль должен содержать хотя бы одну цифру"
//         },
//         min: {
//             message: "Пароль должен состоять минимум из 8 символов",
//             value: 8
//         }
//     }
// };
