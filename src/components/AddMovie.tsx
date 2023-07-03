import React, { useEffect, useState, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IMovieDetailsType } from "../types/movieType";
import ImageHandler from "./ImageHandler";
import Swal from "sweetalert2";

import Button from "./reusables/Button";
import Input from "./reusables/Input";
import TextArea from "./reusables/TextArea";
import Image from "./reusables/Image";
import { addMovieRequest } from "./services/MoviesServices";

export default function AddMovie() {
    const [movieTitle, setMovieTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [lessThanLargeScreen, setLessThanLargeScreen] = useState(false);
    const navigate = useNavigate();

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

        const movieDetails: IMovieDetailsType = {
            image: image,
            title: movieTitle,
            rating: rating,
            description: description,
            date: Date.now(),
        };

        const movieAdded = await addMovieRequest(movieDetails);
        if (movieAdded.status == 200) {
            Swal.fire({
                icon: "success",
                title: "Movie Added!",
            });
            return navigate("/movies");
        }
    };

    return (
        <div className="grid place-items-center mt-10">
            <form onSubmit={addMovieHandler}>
                <div className="max-w-sm lg:max-w-full lg:flex text-gray-300">
                    {image && !lessThanLargeScreen && (
                        <Image
                            src={image}
                            alt={movieTitle}
                            styles={
                                "rounded border-gray-400 max-h-[24em] max-w-[13em] flex-none bg-cover text-center overflow-hidden lg:max-h-[24.9em] lg:min-h-[24em] lg:max-w-[20em] lg:min-w-[20em]"
                            }
                        />
                    )}
                    <div
                        className={`md:w-[25em] border-r border-b border-l border-gray-400 lg:${
                            image == "" ? "border-l rounded-l" : "border-l-0"
                        } border-t lg:border-gray-400 text-white rounded-t rounded p-4 flex flex-col justify-center leading-normal`}
                    >
                        {image && lessThanLargeScreen && (
                            <div className="flex place-content-center">
                                <Image
                                    src={image}
                                    alt={movieTitle}
                                    styles={
                                        "lg:rounded-r-none border-gray-400 max-h-[15em] max-w-[10em] flex-none bg-cover text-center overflow-hidden"
                                    }
                                />
                            </div>
                        )}
                        <ImageHandler imageGetter={image} imageSetter={setImage} />
                        <Input
                            styles={
                                "shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline h-7 bg-gray-800 text-gray-300 py-4 px-3"
                            }
                            label="Movie Title"
                            type="text"
                            setMovieTitle={setMovieTitle}
                            field={"title"}
                        />
                        <TextArea
                            styles={
                                "shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-gray-300 py-2 px-3"
                            }
                            label="Description"
                            type="string"
                            setDescription={setDescription}
                        />
                        <Input
                            styles={
                                "shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline h-7 bg-gray-800 text-gray-300 py-4 px-3"
                            }
                            label="Rating"
                            type="number"
                            setRating={setRating}
                            field={"rating"}
                        />
                        <Button
                            styles={`${
                                isValid
                                    ? "bg-blue-500 text-white hover:bg-blue-700"
                                    : "bg-gray-200 text-gray-500"
                            } p-1 mt-2 rounded `}
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
