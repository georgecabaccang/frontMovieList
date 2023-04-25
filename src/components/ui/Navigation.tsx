import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const [activeLink, setActiveLink] = useState("/");

    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <nav className="grid grid-cols-2 px-10 py-5 mb-10 text-white text-xl border-b border-slate-700 sticky top-0 bg-black z-50">
            <header>Your Movies</header>
            <ul className="flex place-content-end last:pr-3">
                <li
                    className={`pl-5 hover:text-gray-500 ${
                        activeLink == "/" ? "text-gray-500" : ""
                    }`}
                >
                    <Link to="/">Movies</Link>
                </li>
                <li
                    className={`pl-5 hover:text-gray-500 ${
                        activeLink == "/add-movie" ? "text-gray-500" : ""
                    }`}
                >
                    <Link to="/add-movie">Add Movie</Link>
                </li>
            </ul>
        </nav>
    );
}
