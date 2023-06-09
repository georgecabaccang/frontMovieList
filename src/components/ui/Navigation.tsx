import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const [activeLink, setActiveLink] = useState("/");
    const [scrollValue, setScrollValue] = useState(0);
    const [checkScrollValue, setCheckScrollValue] = useState("");
    const location = useLocation();

    // Controls color of Links depending on location
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const scrollValueHandler = (number: number) => {
        setScrollValue(number);
    };

    // Add listener to scrolling on mount
    useEffect(() => {
        document.addEventListener("scroll", () => scrollValueHandler(window.scrollY));

        return () => {
            document.removeEventListener("scroll", () => scrollValueHandler(window.scrollY));
        };
    }, []);

    // Controls shadow of navbar
    useEffect(() => {
        if (scrollValue == 0) {
            setCheckScrollValue("");
            return;
        }
        if (scrollValue > 0 && scrollValue <= 2) {
            setCheckScrollValue("shadow-sm");
            return;
        }
        if (scrollValue >= 5 && scrollValue <= 10) {
            setCheckScrollValue("shadow-md");
            return;
        }
    }, [scrollValue]);

    return (
        <nav
            className={`grid grid-cols-2 px-10 py-5 xxs:mb-2 mb-10 text-white xxs:text-[0.62em] xs:text-xs sm:text-sm md:text-lg lg:text-lg border-b border-slate-700 sticky top-0 bg-black z-10 shadow-gray-500 ${checkScrollValue} `}
        >
            <header>
                <Link to="/">Home</Link>
            </header>
            <ul className="flex place-content-end">
                <li
                    className={`pl-5 hover:text-gray-500 ${
                        activeLink == "/movies" ? "text-gray-500" : ""
                    }`}
                >
                    <Link to="/movies">Movies</Link>
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
