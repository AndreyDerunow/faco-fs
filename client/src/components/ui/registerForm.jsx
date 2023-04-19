import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
import { getQualities } from "../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionsList } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessionsList());

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContaindigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Необходимо выбрать профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    const formatQualities = (elements) => {
        return elements.map((e) => e.value);
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [data]);

    const { email, password } = data;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const newData = {
            ...data,
            qualities: formatQualities(qualities)
        };

        dispatch(signUp(newData));
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
                label="Имя"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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

            <SelectField
                onChange={handleChange}
                options={professionsList}
                value={data.profession}
                error={errors.profession}
                name="profession"
                defaultOption="Choose..."
                label="Выберите вашу профессию"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualitiesList}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckboxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>Лицензионное соглашение</a>
            </CheckboxField>
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

export default RegisterForm;

// const [qualities, setQualities] = useState([]);
// const [professions, setProfessions] = useState();

// useEffect(() => {
//     api.professions.fetchAll().then((data) => {
//         const professionsList = Object.keys(data).map((professionName) => ({
//             label: data[professionName].name,
//             value: data[professionName]._id
//         }));

//         setProfessions(professionsList);
//     });
//     api.qualities.fetchAll().then((data) => {
//         const qualitiesList = Object.keys(data).map((optionName) => ({
//             label: data[optionName].name,
//             value: data[optionName]._id,
//             color: data[optionName].color
//         }));

//         setQualities(qualitiesList);
//     });
// }, []);

// const getProfessionById = (id) => {
//     for (const prof of professions) {
//         if (prof._id === id) {
//             return prof;
//         }
//     }
// };
