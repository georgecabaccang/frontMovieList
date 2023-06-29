import React, { useEffect, useState } from "react";
import { getMovieDetailsRequest } from "./services/MoviesServices";
import { useParams } from "react-router-dom";
import Image from "./reusables/Image";
import { MutatingDots } from "react-loader-spinner";

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
    const [isLoading, setIsLoading] = useState(true);
    const dateAdded = new Date(movieDetails?.date!);

    const { movie_id } = useParams();

    const getMovieDetails = async () => {
        setIsLoading(true);
        if (movie_id) {
            const movieDetails = await getMovieDetailsRequest(movie_id);
            setMovieDetails(movieDetails);
            return setIsLoading(false);
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, []);
    return (
        <div className="flex place-content-center text-gray-200 min-h-[100vh] min-w-full lg:mt-14 lg:max-h-[10em] lg:min-h-[10em] xxs:mt-5 ">
            {isLoading && (
                <div className="w-full h-[20em] flex place-content-center items-center">
                    <MutatingDots
                        height="100"
                        width="100"
                        color="#6699CC"
                        secondaryColor="#6699CC"
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )}
            {movieDetails && !isLoading && (
                <div className=" lg:grid grid-cols-3 lg:grid-cols-5 lg:border lg:p-0 lg:border-gray-700 lg:min-h-[25em] lg:rounded-md lg:shadow-md lg:shadow-gray-500 xs:p-5 xxs:grid-cols-2 flex xxs:flex-col xxs:min-h-full xxs:max-h-[full] max-w-[50em]">
                    <div className="col-span-1 grid lg:col-span-2 container place-content-center items-center">
                        <Image
                            src={movieDetails.image}
                            alt={movieDetails.title}
                            styles="lg:max-h-[24.9em] lg:min-h-[24em] lg:max-w-[20em] lg:min-w-[20em] lg:rounded-l-md xxs:max-h-[13em] xxs:max-w-[8em] xxs:min-h-[13em] xxs:min-w-[8em]"
                        />
                    </div>
                    <div className="col-span-2 grid grid-cols-1 lg:py-10 lg:pr-10 lg:pl-10 lg:col-span-3 py-5 px-4">
                        <div className="max-h-[5em]">
                            <div className="font-bold text-[1.5em]">{movieDetails.title}</div>
                            <div className="text-[0.8em]">Rating: {movieDetails.rating}/5</div>
                        </div>
                        <div>
                            <div className="text-[0.9em] md:max-h-[15em] lg:mt-0 md:min-h-[9em] md:mb-0 xxs:my-5">
                                {movieDetails.description}
                            </div>
                            <div className="text-[1em] lg:mt-5">
                                Date Added: {dateAdded.toLocaleDateString()}{" "}
                                {dateAdded.toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!movieDetails && !isLoading && <div>Movie Not Found</div>}
        </div>
    );
}
