import { createContext, useEffect, useState } from "react";
import { IMovieDetailsType } from "../types/movieType";
import axios from "axios";

interface ValueType {
    movies: Array<IMovieDetailsType>;
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
    const [movies, setMovies] = useState<Array<IMovieDetailsType>>([]);

    const getMovies = async () => {
        const { data } = await axios(
            "https://back-movie-list.vercel.app/movies/getMovies",
            // "http://localhost:8001/movies/getMovies"
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            }
        );

        setMovies(
            data.sort((movieOne: IMovieDetailsType, movieTwo: IMovieDetailsType): number => {
                return movieOne.date > movieTwo.date ? -1 : 1;
            })
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
        <MovieContext.Provider value={MovieContextValues}>{props.children}</MovieContext.Provider>
    );
};
