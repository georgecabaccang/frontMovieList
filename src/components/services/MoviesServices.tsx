import { movieDetailsType } from "../../types/movieType";

export const addMovie = async (
    movieDetails: movieDetailsType
): Promise<boolean> => {
    const response = await fetch("http://localhost:8000/movies/addMovie", {
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
    const response = await fetch("http://localhost:8000/movies/updateMovie", {
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

    const response = await fetch("http://localhost:8000/movies/removeMovie", {
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
