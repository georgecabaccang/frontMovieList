import React, { useContext, useState } from "react";
import { MovieContext } from "../store/MovieContext";
import { movieDetailsType } from "../types/movieType";

import Button from "./reusables/Button";
import { removeMovie } from "./services/MoviesServices";
import UpdateModal from "./UpdateModal";

import "../index.css";
import Image from "./reusables/Image";
import RemoveModal from "./RemoveModal";
import { Link } from "react-router-dom";

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
            <div className="flex overflow-hidden drop-shadow-[0_4px_4px_rgba(255,255,255,0.6)] xxs:h-[12em] xs:h-[11em] sm:h-[12em] md:h-[14em] lg:h-[15em] relative rounded">
                <div className="cont">
                    <div className="flex-1 marker:px-6 h-full">
                        <div className="grid grid-cols-1 place-items-center min-h-full">
                            <Image
                                styles={"min-h-full min-w-full"}
                                src={props.image}
                                alt={`${props.title}-image`}
                            />
                        </div>
                        <div className="absolute top-0 lg:max-h-[15em] md:max-h-[14em] sm:max-h-[12em] xs:max-h-[11em] xxs:max-h-[10em] min-w-full p-3 hover:opacity-100 z-10 bg-black opacity-0 text-white hover:border border-white rounded">
                            <Link to={`/movies/${props.title}/${props._id}`}>
                                <div className="font-bold mb-2 h-[1em] xxs:text-[0.8em] xs:text-xs md:text-md lg:text-[1.2em]">
                                    {props.title}
                                </div>
                                <div className="h-full">
                                    <h4 className="xxs:text-[0.6em] md:text-[0.7em]">{`Rating: ${props.rating}/5`}</h4>
                                </div>
                                <div className="xxs:h-[6.5em] xs:h-[5em] md:h-[7em]">
                                    <p className="text-base break-words cut-description xxs:text-[0.6em] xs:text-[0.5em] md:text-[0.6em]">
                                        {props.description}
                                    </p>
                                </div>
                                <div className="xxs:text-[0.4em] xs:text-[0.2em] sm:text-[0.41em] md:text-[0.5em] lg:text-[0.6em] xl:text-[0.7em] mb-1 xs:mt-2 sm:mt-4 md:mt-2 xxs:mb-1 lg:mb-1">
                                    <p>{`Added: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
                                </div>
                            </Link>
                            <div className="grid grid-cols-2 gap-1 h-[3em] place-items-center xxs:text-[0.5em] xs:text-[0.45em] sm:text-[0.6em] md:text-[0.75em] lg:text-[0.8em]">
                                <Button
                                    styles={
                                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 border border-blue-700 rounded xxs:w-[7em] xs:w-[6em] sm:w-[6.1em] md:w-[5.5em] lg:w-[5.6em] xl:w-[6em]"
                                    }
                                    type={"button"}
                                    name={"Update"}
                                    onClickFunction={() => setShowUpdateModal(true)}
                                />
                                <Button
                                    styles={
                                        "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-1 hover:text-white border border-blue-500 hover:border-transparent rounded xxs:w-[7em] xs:w-[6em] sm:w-[6.1em] md:w-[5.5em] lg:w-[5.6em] xl:w-[6em]"
                                    }
                                    type={"button"}
                                    name={"Remove"}
                                    onClickFunction={() => setShowRemoveModal(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
