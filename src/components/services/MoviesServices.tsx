import { movieDetailsType } from "../../types/movieType";

const backendURL =
    "https://movies-back-project.netlify.app/.netlify/functions/server/";
// "http://localhost:8001/.netlify/functions/server/";

export const addMovie = async (
    movieDetails: movieDetailsType
): Promise<boolean> => {
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

export const updateMovie = async (
    updatedDetails: movieDetailsType
): Promise<boolean> => {
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
