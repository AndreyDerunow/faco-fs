import React from "react";
import { Redirect, useParams } from "react-router-dom";

import UsersListPage from "../page/usersListPage/usersList";
import User from "../page/userPage/userCard";
import EditForm from "../ui/editForm";
import UsersLoader from "../ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
const Users = () => {
    const { userId, action } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    if (action && userId !== currentUserId) {
        return;
    }
    return (
        <>
            <UsersLoader>
                {!userId ? (
                    <UsersListPage />
                ) : !(action && action === "edit") ? (
                    <User userId={userId} />
                ) : currentUserId === userId ? (
                    <EditForm />
                ) : (
                    <Redirect to={`/users/${currentUserId + "/" + action}`} />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
