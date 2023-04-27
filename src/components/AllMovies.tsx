import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../store/MovieContext";

import Movie from "./Movie";

export default function AllMovies() {
    const movieContext = useContext(MovieContext);

    return (
        <ul className="grid xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-8 gap-3 py-3 xxs:mx-3 xs:mx-3 md:mx-10 lg:mx-14">
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
