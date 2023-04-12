import React, { useContext, useState } from "react";
import { MovieContext } from "../store/MovieContext";
import { movieDetailsType } from "../types/movieType";

import Button from "./reusables/Button";
import { removeMovie } from "./services/MoviesServices";
import UpdateModal from "./UpdateModal";

import "../index.css";
import Image from "./reusables/Image";

export default function Movie(props: movieDetailsType) {
    const [showModal, setShowModal] = useState(false);
    const movieContext = useContext(MovieContext);

    const removeMovieHandler = async () => {
        let deleted;
        if (props._id) {
            deleted = await removeMovie(props._id);
        }
        if (deleted == true) {
            return movieContext.getMovies();
        }
        return console.log(deleted);
    };

    const updateModalHandler = () => {
        setShowModal(true);
    };

    const date = new Date(props.date);

    return (
        <li>
            <div>
                {showModal ? (
                    <UpdateModal
                        _id={props._id}
                        image={props.image}
                        title={props.title}
                        description={props.description}
                        rating={props.rating}
                        date={props.date}
                        getterProps={showModal}
                        setterProps={setShowModal}
                    />
                ) : (
                    false
                )}
            </div>

            <div className="flex rounded overflow-hidden shadow-lg bg-orange-100 h-[15em]">
                <div className="cont">
                    <div className="flex-1 marker:px-6 h-full">
                        <div className="grid grid-cols-1 place-items-center">
                            <Image
                                styles={"object-fit h-[15em] min-w-full"}
                                src={props.image}
                                alt={`${props.title}-image`}
                            />
                        </div>
                        <div className="grid grid-cols-1 details-block h-[15em] text-white p-3">
                            <div className="font-bold text-xl mb-2 h-[1em] mFontSize">
                                {props.title}
                            </div>
                            <div className="h-full">
                                <h4 className="sFontSize">{`Rating: ${props.rating}/5`}</h4>
                            </div>
                            <div className="h-[7em]">
                                <p className="text-base break-words cut-description xsFontSize">
                                    {props.description}
                                </p>
                            </div>
                            <div>
                                <h3 className="xxsFontSize my-2">{`Added: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-1 h-[3em] place-items-center sFontSize">
                                <Button
                                    styles={
                                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                                    }
                                    type={"button"}
                                    name={"Update"}
                                    onClickFunction={() => updateModalHandler()}
                                />
                                <Button
                                    styles={
                                        "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-1 px-2 hover:text-white border border-blue-500 hover:border-transparent rounded"
                                    }
                                    type={"button"}
                                    name={"Remove"}
                                    onClickFunction={() => removeMovieHandler()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
