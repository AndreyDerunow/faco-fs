import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Table from "../common/table";
import Profession from "./profession";
import QualitiesList from "./qualities/qualitiesList";

const UserTable = ({ users, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        complitedMeetings: {
            path: "complitedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark id={user._id} bookmark={user.bookmark} {...rest} />
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
// delete: {
//     component: (user) => (
//         <button
//             id={user._id}
//             className="btn btn-danger"
//             onClick={(e) => onDelete(e.target.id)}
//         >
//             delete
//         </button>
//     )
// }
