import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <header>Your Movies</header>
            <ul>
                <li>
                    <Link to="/">Movies</Link>
                </li>
                <li>
                    <Link to="/add-movie">Add Movie</Link>
                </li>
            </ul>
        </nav>
    );
}
