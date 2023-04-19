import React, { useState, useEffect } from "react";
import { pagination } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import UserSearch from "../../common/userSearch";
import GroupList from "../../common/groupList";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessionsList,
    getProfessionsListLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessionsList());
    const professionsLoading = useSelector(getProfessionsListLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchStr, setSearchStr] = useState("");
    const users = useSelector(getUsersList());
    const pageSize = 4;
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchStr]);

    const handleMakeFavorite = (id) => {
        console.log(id);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        if (searchStr) {
            setSearchStr("");
        }
    };
    const handleSearchUsers = ({ target }) => {
        const str = target.value;
        setSearchStr(str);
        if (selectedProf) {
            setSelectedProf();
        }
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        function filterUsers(data) {
            let filteredUsers;
            if (selectedProf) {
                filteredUsers = selectedProf
                    ? data.filter(
                          (user) =>
                              JSON.stringify(user.profession) ===
                              JSON.stringify(selectedProf._id)
                      )
                    : data;
            } else if (searchStr) {
                filteredUsers = data.filter(
                    (user) =>
                        user.name
                            .toUpperCase()
                            .indexOf(searchStr.toUpperCase().trim()) !== -1
                );
            } else {
                filteredUsers = data;
            }
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = pagination(sortedUsers, pageSize, currentPage);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="flex flex-column">
                    <SearchStatus number={count} />
                    <UserSearch
                        onSearch={handleSearchUsers}
                        searchStr={searchStr}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onFavorite={handleMakeFavorite}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default UsersListPage;

// setUsers((users) =>
//     users.map((user) => {
//         if (user._id === id) {
//             return { ...user, bookmark: !user.bookmark };
//         }
//         return user;
//     })
// );
