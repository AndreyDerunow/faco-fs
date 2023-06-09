import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";
import { getCurrentUserId } from "../../store/users";

const UserBlock = ({ user, src }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const history = useHistory();
    const profession = useSelector(getProfessionById(user.profession));
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    if (user) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    {currentUserId === user._id && (
                        <button
                            onClick={handleClick}
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        >
                            <i className="bi bi-gear"></i>
                        </button>
                    )}

                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={src}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">{profession.name}</p>
                            <div className="text-muted">
                                <i
                                    className="bi bi-caret-down-fill text-primary"
                                    role="button"
                                ></i>
                                <i
                                    className="bi bi-caret-up text-secondary"
                                    role="button"
                                ></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

UserBlock.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string,
    src: PropTypes.string
};

export default UserBlock;
