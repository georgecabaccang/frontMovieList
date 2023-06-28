import React, { useContext, useEffect, useMemo, useState } from "react";
import { MovieContext } from "../store/MovieContext";

import Movie from "./Movie";
import { IMovieDetailsType } from "../types/movieType";
import { useSearchParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

export default function AllMovies() {
    const [movies, setMovies] = useState<Array<IMovieDetailsType>>();
    const [isLoading, setIsLoading] = useState(true);

    const movieContext = useContext(MovieContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const filteredMovies = useMemo(() => {
        const returnedMovies = movies?.filter((movies) => {
            return movies.title.toLowerCase().includes(searchParams.get("movie")!);
        });
        if (returnedMovies?.length == 0) {
            return movies;
        } else {
            return returnedMovies;
        }
    }, [movies, searchParams]);

    useEffect(() => {
        setMovies(movieContext.movies);
    }, [movieContext.movies]);

    return (
        <div className="flex flex-col place-items-center">
            <div className="flex text-gray-200 place-content-center items-center z-20 top-5 mt-5 max-w-[45vw] md:sticky md:bg-none md:min-w-[20em] xxs:fixed xxs:top-12 xxs:bg-black xxs:min-w-full xxs:min-h-[3em] xxs:mt-2 xxs:bg-opacity-80">
                <div className="place-self-center border pr-3 py-1 pl-4 rounded-l-lg border-gray-800 border-r-none bg-gray-700">
                    Search
                </div>
                <input
                    type="text"
                    className="rounded-r-lg py-1 px-2 bg-gray-800 md:min-w-[15em] xxs:min-w-[10em] border-l-none"
                    onChange={(event) => setSearchParams({ movie: event.target.value })}
                />
                {/* <button className="text-gray-200 border border-gray-500 rounded-md py-[0.15em] px-4 ml-2 bg-gray-800 hover:bg-gray-700 hover:shadow-md hover:shadow-gray-500">
                    Search
                </button> */}
            </div>
            {filteredMovies?.length == 0 && !isLoading && <div>No Movies Added Yet</div>}
            {filteredMovies?.length == 0 && isLoading && (
                <div className="flex text-white min-h-[30em] place-content-center items-center font-bold">
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
            {filteredMovies?.length != 0 && (
                <div className="my-6 xxs:mt-10">
                    <ul className="grid xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-8 gap-3 py-3 xxs:mx-3 xs:mx-3 md:mx-10 lg:mx-14">
                        {filteredMovies?.map((movie) => {
                            return (
                                <Movie
                                    key={movie._id}
                                    _id={movie._id}
                                    image={movie.image}
                                    title={movie.title}
                                    rating={movie.rating}
                                    description={movie.description}
                                    date={movie.date}
                                />
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
