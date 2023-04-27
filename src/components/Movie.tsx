import React, { useContext, useState } from "react";
import { MovieContext } from "../store/MovieContext";
import { movieDetailsType } from "../types/movieType";

import Button from "./reusables/Button";
import { removeMovie } from "./services/MoviesServices";
import UpdateModal from "./UpdateModal";

import "../index.css";
import Image from "./reusables/Image";
import RemoveModal from "./RemoveModal";

export default function Movie(props: movieDetailsType) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const date = new Date(props.date);

    return (
        <li>
            <div>
                {showUpdateModal ? (
                    <UpdateModal
                        _id={props._id}
                        image={props.image}
                        title={props.title}
                        description={props.description}
                        rating={props.rating}
                        date={props.date}
                        getterProps={showUpdateModal}
                        setterProps={setShowUpdateModal}
                    />
                ) : (
                    false
                )}
            </div>
            <div>
                {showRemoveModal ? (
                    <RemoveModal
                        _id={props._id}
                        image={props.image}
                        title={props.title}
                        description={props.description}
                        rating={props.rating}
                        date={props.date}
                        getterProps={showRemoveModal}
                        setterProps={setShowRemoveModal}
                    />
                ) : (
                    false
                )}
            </div>
            <div className="flex overflow-hidden shadow-2xl shadow-gray-500 xs:h-[11em] sm:h-[12em] md:h-[14em] lg:h-[15em]">
                <div className="cont">
                    <div className="flex-1 marker:px-6 h-full">
                        <div className="grid grid-cols-1 place-items-center min-h-full">
                            <Image
                                styles={"min-h-full min-w-full"}
                                src={props.image}
                                alt={`${props.title}-image`}
                            />
                        </div>
                        <div className="grid grid-cols-1 details-block h-[15em] text-white p-3">
                            <div className="font-bold mb-2 h-[1em] xs:text-xs md:text-md lg:text-[1.2em]">
                                {props.title}
                            </div>
                            <div className="h-full">
                                <h4 className="xs:text-[0.6em] md:text-[0.7em]">{`Rating: ${props.rating}/5`}</h4>
                            </div>
                            <div className="xs:h-[5em] md:h-[7em]">
                                <p className="text-base break-words cut-description xs:text-[0.5em] md:text-[0.6em]">
                                    {props.description}
                                </p>
                            </div>
                            <div className="xs:text-[0.2em] sm:text-[0.41em] md:text-[0.5em] lg:text-[0.6em] xl:text-[0.7em] mb-1 xs:mt-2 sm:mt-4 md:mt-2 lg:mb-1">
                                <p>{`Added: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1 h-[3em] place-items-center xs:text-[0.45em] sm:text-[0.6em] md:text-[0.75em] lg:text-[0.8em]">
                                <Button
                                    styles={
                                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 border border-blue-700 rounded xs:w-[6em] sm:w-[6.1em] md:w-[5.5em] lg:w-[5.6em] xl:w-[6em]"
                                    }
                                    type={"button"}
                                    name={"Update"}
                                    onClickFunction={() =>
                                        setShowUpdateModal(true)
                                    }
                                />
                                <Button
                                    styles={
                                        "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-1 hover:text-white border border-blue-500 hover:border-transparent rounded xs:w-[6em] sm:w-[6.1em] md:w-[5.5em] lg:w-[5.6em] xl:w-[6em]"
                                    }
                                    type={"button"}
                                    name={"Remove"}
                                    onClickFunction={() =>
                                        setShowRemoveModal(true)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
