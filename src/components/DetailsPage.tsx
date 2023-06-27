import React, { useEffect, useState } from "react";
import { getMovieDetailsRequest } from "./services/MoviesServices";
import { useParams } from "react-router-dom";
import Image from "./reusables/Image";

interface IMoveDetails {
    _id: string;
    image: string;
    title: string;
    description: string;
    rating: number;
    date: Date;
}

export default function DetailsPage() {
    const [movieDetails, setMovieDetails] = useState<IMoveDetails>();
    const dateAdded = new Date(movieDetails?.date!);

    const { movie_id } = useParams();

    const getMovieDetails = async () => {
        if (movie_id) {
            const movieDetails = await getMovieDetailsRequest(movie_id);
            setMovieDetails(movieDetails);
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, []);
    return (
        <div className="flex place-content-center items-center text-gray-200 min-w-full max-h-[32em] mt-10">
            {movieDetails && (
                <div className="grid grid-cols-3 max-w-[50em] max-h-[25em] min-h-[25em] border border-gray-700 rounded-md shadow-md shadow-gray-500">
                    <div className="flex col-span-1 container place-content-center items-center">
                        <Image
                            src={movieDetails.image}
                            alt={movieDetails.title}
                            styles="max-h-[25em] min-w-[15em]"
                        />
                    </div>
                    <div className="col-span-2 grid grid-cols-1 py-5 px-4">
                        <div className="max-h-[5em]">
                            <div className="font-bold text-[1.5em]">{movieDetails.title}</div>
                            <div className="text-[0.8em]">Rating: {movieDetails.rating}/5</div>
                        </div>
                        <div>
                            <div className="text-[0.9em] min-h-[15em]">
                                {movieDetails.description}
                            </div>
                            <div className="text-[1em]">
                                Date Added: {dateAdded.toLocaleDateString()}{" "}
                                {dateAdded.toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!movieDetails && <div>Movie Not Found</div>}
        </div>
    );
}
