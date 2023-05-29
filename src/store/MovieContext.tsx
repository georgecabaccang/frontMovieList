import { createContext, useEffect, useState } from "react";
import { movieDetailsType } from "../types/movieType";

interface ValueType {
    movies: Array<movieDetailsType>;
    getMovies: () => void;
}

interface MovieProps {
    children?: React.ReactNode;
}

export const MovieContext = createContext<ValueType>({
    movies: [],
    getMovies: () => {},
});

export const MovieProvider = (props: MovieProps) => {
    const [movies, setMovies] = useState<Array<movieDetailsType>>([]);

    const getMovies = async () => {
        const response = await fetch(
            // "https://movies-back-project.netlify.app/.netlify/functions/server/getMovies"
            "https://back-movie-list-ovea.vercel.app/server/getMovies"
        );
        const loadedMovies = await response.json();
        setMovies(
            loadedMovies.sort(
                (
                    movieOne: movieDetailsType,
                    movieTwo: movieDetailsType
                ): number => {
                    return movieOne.date > movieTwo.date ? -1 : 1;
                }
            )
        );
    };

    useEffect(() => {
        getMovies();
    }, []);

    const MovieContextValues: ValueType = {
        movies: movies,
        getMovies: getMovies,
    };

    return (
        <MovieContext.Provider value={MovieContextValues}>
            {props.children}
        </MovieContext.Provider>
    );
};
