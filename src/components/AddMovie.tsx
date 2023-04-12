import React, { useEffect, useState, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { movieDetailsType } from "../types/movieType";
import ImageHandler from "./ImageHandler";

import Button from "./reusables/Button";
import Input from "./reusables/Input";
import TextArea from "./reusables/TextArea";
import Image from "./reusables/Image";
import { addMovie } from "./services/MoviesServices";

export default function AddMovie() {
    const [movieTitle, setMovieTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [lessThanLargeScreen, setLessThanLargeScreen] = useState(false);
    const navigate = useNavigate();

    const movieContext = useContext(MovieContext);

    useEffect(() => {
        if (movieTitle && rating && description && image) {
            setIsValid(true);
            return;
        }
        setIsValid(false);
    }, [movieTitle, rating, description, image]);

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    useEffect(() => {
        if (windowWidth < 1024) {
            return setLessThanLargeScreen(true);
        }
        return setLessThanLargeScreen(false);
    }, [windowWidth]);

    const resizeHandler = () => {
        setWindowWidth(window.innerWidth);
    };

    const addMovieHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const movieDetails: movieDetailsType = {
            image: image,
            title: movieTitle,
            rating: rating,
            description: description,
            date: Date.now(),
        };

        const movieAdded = await addMovie(movieDetails);
        if (movieAdded == true) {
            movieContext.getMovies();
            return navigate("/");
        }
        return console.log(movieAdded);
    };
    return (
        <div className="grid place-items-center">
            <form onSubmit={addMovieHandler}>
                <div className="max-w-sm lg:max-w-full lg:flex">
                    {image && !lessThanLargeScreen && (
                        <Image
                            src={image}
                            alt={movieTitle}
                            styles={
                                "border-t border-l border-b rounded lg:rounded-r-none border-gray-400 h-auto w-60 flex-none bg-cover text-center overflow-hidden"
                            }
                        />
                    )}
                    <div
                        className={`md:w-[25em] border-r border-b border-l border-gray-400 lg:${
                            image == "" ? "border-l rounded-l" : "border-l-0"
                        } border-t lg:border-gray-400 bg-white rounded-t rounded lg:rounded-l-none lg:rounded-t-none lg:rounded-b lg:rounded-r p-4 flex flex-col justify-center leading-normal`}
                    >
                        {image && lessThanLargeScreen && (
                            <div className="grid grid-cols-1 place-items-center">
                                <Image
                                    src={image}
                                    alt={movieTitle}
                                    styles={
                                        "border-t border-l border-b rounded lg:rounded-r-none border-gray-400 h-60 h-auto w-40 flex-none bg-cover text-center overflow-hidden"
                                    }
                                />
                            </div>
                        )}
                        <ImageHandler
                            imageGetter={image}
                            imageSetter={setImage}
                        />
                        <Input
                            styles={
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-7"
                            }
                            label="Movie Title"
                            type="text"
                            setMovieTitle={setMovieTitle}
                            field={"title"}
                        />
                        <TextArea
                            styles={
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            }
                            label="Description"
                            type="string"
                            setDescription={setDescription}
                        />
                        <Input
                            styles={
                                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-7"
                            }
                            label="Rating"
                            type="number"
                            setRating={setRating}
                            field={"rating"}
                        />
                        <Button
                            styles={`${
                                isValid ? "bg-blue-400" : "bg-gray-200"
                            } border p-1 mt-2 border-`}
                            name="Add Movie"
                            type="submit"
                            disabled={!isValid}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
