import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radio.Field";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import ButtonGoBack from "../common/buttonGoBack";

import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessionsList,
    getProfessionsListLoadingStatus
} from "../../store/professions";
import { getCurrentUserData, updateUser } from "../../store/users";
import history from "../../utils/history";

const EditForm = () => {
    const { action } = useParams();
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const professionsArr = useSelector(getProfessionsList());
    const professionsLoadingStatus = useSelector(
        getProfessionsListLoadingStatus()
    );
    const professionOptions = Object.keys(professionsArr).map((p) => {
        return {
            label: professionsArr[p].name,
            value: professionsArr[p]._id
        };
    });
    useEffect(() => {
        setUser(currentUser);
    }, []);
    const qualitiesArr = useSelector(getQualities());
    const qualitiesLoadingStatus = useSelector(getQualitiesLoadingStatus());
    const qualitiesOptions = Object.keys(qualitiesArr).map((optionName) => ({
        label: qualitiesArr[optionName].name,
        value: qualitiesArr[optionName]._id,
        color: qualitiesArr[optionName].color
    }));

    const formateUser = (user) => {
        const formatedUser = { ...user };
        formatedUser.profession = professionOptions.find(
            (p) => p.value === user.profession
        );
        formatedUser.qualities = user.qualities.map((qual) =>
            qualitiesOptions.find((q) => q.value === qual)
        );
        return formatedUser;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formatedQualities = user.qualities.map((q) => {
            return typeof q === "string" ? q : `${q.value}`;
        });
        const data = {
            ...user,
            qualities: formatedQualities
        };
        dispatch(updateUser(data));
        history.push("/users/" + currentUser._id);
    };
    const handleChange = (target) => {
        setUser((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [user]);

    if (user && !professionsLoadingStatus && !qualitiesLoadingStatus) {
        const { name, email, profession, sex, qualities } = formateUser(user);
        return (
            <div className="container mt-5">
                <ButtonGoBack />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                action={action}
                                onChange={handleChange}
                                options={professionOptions}
                                value={profession.value}
                                name="profession"
                                defaultOption={profession.name}
                                label="Выберите вашу профессию"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                onChange={handleChange}
                                options={qualitiesOptions}
                                name="qualities"
                                defaultValue={qualities}
                                label="Выберите ваши качества"
                            />
                            <button
                                disabled={!isValid}
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default EditForm;
