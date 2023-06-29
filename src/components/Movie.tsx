import React, { useContext, useState } from "react";
import { IMovieDetailsType } from "../types/movieType";

import Button from "./reusables/Button";
import UpdateModal from "./UpdateModal";

import "../index.css";
import Image from "./reusables/Image";
import RemoveModal from "./RemoveModal";
import { Link } from "react-router-dom";

export default function Movie(props: IMovieDetailsType) {
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
            <div className="flex overflow-hidden drop-shadow-[0_4px_4px_rgba(255,255,255,0.6)] lg:h-[15em] md:h-[14em] sm:h-[12em] xs:h-[11em] xxs:h-[12em] relative rounded">
                <div className="cont">
                    <div className="flex-1 marker:px-6 h-full">
                        <div className="grid grid-cols-1 place-items-center min-h-full">
                            <Image
                                styles={"min-h-full min-w-full max-h-[10em]"}
                                src={props.image}
                                alt={`${props.title}-image`}
                            />
                        </div>
                        <div className="absolute top-0 2xl:max-w-[12em] 2xl:min-w-[11em] xl:max-w-[9.8em] xl:min-w-[9.8em] lg:max-h-[15em] lg:min-h-[15em] lg:max-w-[11em] lg:min-w-[10.2em] lg:p-3 md:max-h-[14em] md:min-h-[14em] md:max-w-[10.2em] md:min-w-[10.2em] sm:max-h-[12em] sm:max-w-[9em] sm:min-w-[9em] semi-sm:min-w-[8em] xs:max-h-[12.55em] xs:min-h-[11em] xs:max-w-[6.8em] xs:min-w-[6.7em] xs:p-2 xxs:max-h-[10em] xxs:min-h-[12em] xxs:max-w-[1em] min-w-full p-3 hover:opacity-100 z-10 bg-black opacity-0 text-white hover:border border-gray-500 rounded">
                            <Link to={`/movies/${props.title}/${props._id}`}>
                                <div className="font-bold mb-2 2xl:h-[1.5em] xl:text-[1.2em] xl:min-w-[6.8em] xl:max-w-[6.8em] lg:h-[1.3em] lg:min-w-[9.3rem] lg:max-w-[9.3rem] lg:text-[1.3em] md:max-w-[7.8rem] md:text-lg md:h-[1.5em] xs:text-xs xxs:text-[0.8em] xxs:truncate xxs:text-ellipsis xxs:overflow-hidden ">
                                    {props.title}
                                </div>
                                <div className="h-full">
                                    <h4 className=" lg:text-[0.7em] xxs:text-[0.6em]">{`Rating: ${props.rating}/5`}</h4>
                                </div>
                                <div className="lg:h-[7em] md:h-[6em] xs:h-[5em] xxs:h-[5.8em]">
                                    <div className="text-base md:text-[0.6em] sm:line-clamp-3 xs:text-[0.5em] xxs:text-[0.5em] xxs:line-clamp-3">
                                        {props.description}
                                    </div>
                                </div>
                                <div className="xl:text-[0.55em] lg:text-[0.6em] lg:mt-0 lg:mb-1 md:text-[0.5em] md:mt-2 sm:text-[0.5em] sm:mt-3 xs:text-[0.4em] semi-sm:text-[0.4em] xs:mt-2 xxs:text-[0.4em] xxs:mb-1 mb-1">
                                    <p>{`Added: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
                                </div>
                            </Link>
                            <div className="grid grid-cols-2 place-items-center lg:gap-1 lg:text-[0.8em] md:gap-3 md:text-[0.75em] sm:text-[0.6em] xs:text-[0.45em] xxs:text-[0.5em] h-[3em] ">
                                <Button
                                    styles={
                                        "2xl:w-[5.8em] xl:w-[5em] lg:w-[5.6em] md:w-[5.5em] sm:w-[6.1em] semi-sm:w-[7em] xs:w-[6em] xxs:w-[6.5em] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 border border-blue-700 rounded"
                                    }
                                    type={"button"}
                                    name={"Update"}
                                    onClickFunction={() => setShowUpdateModal(true)}
                                />
                                <Button
                                    styles={
                                        "2xl:w-[5.8em] xl:w-[5em] lg:w-[5.6em] md:w-[5.5em] sm:w-[6.1em] semi-sm:w-[7em] xs:w-[6em] xxs:w-[6.5em] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-1 hover:text-white border border-blue-500 hover:border-transparent rounded"
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
