import React from "react";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import MeetingsBlock from "../../ui/meetingsBlock";
import QualitiesBlock from "../../ui/qualitiesBlock";
import UserBlock from "../../ui/userBlock";

import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const User = ({ userId: id }) => {
    const user = useSelector(getUserById(id));

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserBlock user={user} src={user.image} id={id} />
                        <QualitiesBlock data={user.qualities} />
                        <MeetingsBlock data={user.complitedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

User.propTypes = {
    userId: PropTypes.string
};

export default User;
