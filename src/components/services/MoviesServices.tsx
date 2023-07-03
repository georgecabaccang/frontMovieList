import axios, { AxiosError } from "axios";
import { IMovieDetailsType } from "../../types/movieType";

// const myAxios = axios.create({ baseURL: "http://localhost:8001/movies" });
const myAxios = axios.create({ baseURL: "https://back-movie-list.vercel.app/movies" });

export const getMoviesRequest = async () => {
    try {
        const response = await myAxios.get(`/getMovies`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.code == "ERR_NETWORK") {
                return { status: 0 };
            }
        }
    }
};

export const addMovieRequest = async (movieDetails: IMovieDetailsType) => {
    const response = await myAxios.post(`/addMovie`, {
        movieDetails: movieDetails,
    });
    return response;
};

export const updateMovieRequest = async (updatedDetails: IMovieDetailsType) => {
    const response = await myAxios.patch(`/updateMovie`, {
        updatedDetails: updatedDetails,
    });
    
    return response;
};

export const removeMovieRequest = async (movieId: string) => {
    try {
        const response = await myAxios.delete(`/removeMovie/${movieId}`);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
};

export const getMovieDetailsRequest = async (movie_id: string) => {
    try {
        const response = await myAxios.get(`/getMovieDetails/${movie_id}`);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
    }
};
