import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const [activeLink, setActiveLink] = useState("/");
    const [scrollValue, setScrollValue] = useState(0);
    const [checkScrollValue, setCheckScrollValue] = useState("");
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const scrollValueHandler = (number: number) => {
        setScrollValue(number);
    };

    useEffect(() => {
        document.addEventListener("scroll", () =>
            scrollValueHandler(window.scrollY)
        );

        return () => {
            document.removeEventListener("scroll", () =>
                scrollValueHandler(window.scrollY)
            );
        };
    }, []);

    useEffect(() => {
        if (scrollValue == 0) {
            setCheckScrollValue("");
            return;
        }
        if (scrollValue > 0 && scrollValue <= 2) {
            setCheckScrollValue("shadow-sm");
            console.log(scrollValue);
            return;
        }
        if (scrollValue >= 5 && scrollValue <= 10) {
            setCheckScrollValue("shadow-md");
            console.log(scrollValue);
            return;
        }
    }, [scrollValue]);

    return (
        <nav
            className={`grid grid-cols-2 px-10 py-5 mb-10 text-white text-xl border-b border-slate-700 sticky top-0 bg-black z-50 shadow-gray-500 ${checkScrollValue}`}
        >
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
