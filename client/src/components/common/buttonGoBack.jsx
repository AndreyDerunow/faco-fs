import React from "react";
import { useHistory } from "react-router-dom";

const ButtonGoBack = () => {
    const history = useHistory();
    return (
        <button
            onClick={() => {
                history.goBack();
            }}
            type="submit"
            className="btn btn-primary"
        >
            Назад
        </button>
    );
};

export default ButtonGoBack;
