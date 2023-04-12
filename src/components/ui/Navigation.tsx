import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    const [activeLink, setActiveLink] = useState("movieList");

    const linkChange = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className="grid grid-cols-2 pl-5 pr-2 py-3 mb-10 bg-gray-200">
            <header>Your Movies</header>
            <ul className="flex place-content-end last:pr-3">
                <li
                    className={`pl-5 hover:text-gray-500 ${
                        activeLink == "movieList" ? "text-gray-500" : ""
                    }`}
                    onClick={() => linkChange("movieList")}
                >
                    <Link to="/">Movies</Link>
                </li>
                <li
                    className={`pl-5 hover:text-gray-500 ${
                        activeLink == "addMovie" ? "text-gray-500" : ""
                    }`}
                    onClick={() => linkChange("addMovie")}
                >
                    <Link to="/add-movie">Add Movie</Link>
                </li>
            </ul>
        </nav>
    );
}
