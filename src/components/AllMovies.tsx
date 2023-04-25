import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../store/MovieContext";

import Movie from "./Movie";

export default function AllMovies() {
    const movieContext = useContext(MovieContext);

    return (
        <ul className="grid grid-cols-5 gap-3 py-3 mx-14">
            {movieContext?.movies?.map((movie) => {
                return (
                    <Movie
                        key={movie._id}
                        _id={movie._id}
                        image={movie.image}
                        title={movie.title}
                        rating={movie.rating}
                        description={movie.description}
                        date={movie.date}
                    />
                );
            })}
        </ul>
    );
}
