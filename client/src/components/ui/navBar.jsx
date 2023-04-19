import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLogedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLogedIn = useSelector(getIsLogedIn());
    return (
        <>
            <nav className="navbar bg-light mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Main
                            </Link>
                        </li>
                        {isLogedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Users
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {isLogedIn ? (
                            <NavProfile />
                        ) : (
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/login"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
