import { IMovieDetailsType } from "../../types/movieType";

const backendURL =
    // "https://movies-back-project.netlify.app/.netlify/functions/server/";
    "https://back-movie-list-ovea.vercel.app/movies/";
    // "http://localhost:8001/movies/";

export const addMovie = async (movieDetails: IMovieDetailsType): Promise<boolean> => {
    const response = await fetch(`${backendURL}addMovie`, {
        method: "POST",
        body: JSON.stringify(movieDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data == true) {
        return true;
    }
    return data;
};

export const updateMovie = async (updatedDetails: IMovieDetailsType): Promise<boolean> => {
    const response = await fetch(`${backendURL}updateMovie`, {
        method: "PATCH",
        body: JSON.stringify(updatedDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data == true) {
        return true;
    }
    return data;
};

export const removeMovie = async (movieId: string) => {
    if (movieId === "") return console.log("Movie does not exist.");

    const response = await fetch(`${backendURL}removeMovie`, {
        method: "DELETE",
        body: JSON.stringify({
            _id: movieId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (data == true) {
        return true;
    }
    return data;
};

export const getMovieDetailsRequest = async (movie_id: string) => {
    try {
        const response = await fetch(`${backendURL}getMovieDetails/${movie_id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
    }
};
