import { FormEvent, useContext, useState, Fragment, useRef, useDebugValue } from "react";
import { IMovieDetailsType } from "../types/movieType";
import Button from "./reusables/Button";
import Input from "./reusables/Input";
import { updateMovieRequest } from "./services/MoviesServices";
import ImageHandler from "./ImageHandler";

import { Dialog, Transition } from "@headlessui/react";
import TextArea from "./reusables/TextArea";
import Swal from "sweetalert2";
import Image from "./reusables/Image";
import { AxiosResponse } from "axios";

interface IUpdateModal extends IMovieDetailsType {
    getMovies: () => void;
    getterProps: boolean;
    setterProps: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateModal(props: IUpdateModal) {
    const cancelButtonRef = useRef(null);

    const [updatedImage, setUpdateImage] = useState(props.image);
    const [updatedMovieTitle, setUpdatedMovieTitle] = useState(props.title);
    const [updatedRating, setUpdatedRating] = useState(props.rating);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);

    const prevTitle = props.title;
    const prevDescription = props.description;
    const prevRating = props.rating;
    const prevImage = props.image;

    let emptyTile: boolean = false;
    if (updatedMovieTitle == "") {
        emptyTile = true;
    }

    let emptyRating: boolean = false;
    if (updatedRating == 0) {
        emptyRating = true;
    }

    let emptyDesc: boolean = false;
    if (updatedDescription == "") {
        emptyDesc = true;
    }

    let emptyImage: boolean = false;
    if (updatedImage == "") {
        emptyImage = true;
    }

    const updatedMovieDetails = (updatedValue: {
        image: string;
        title: string;
        description: string;
        rating: number;
    }) => {
        setUpdateImage(updatedValue.image);
        setUpdatedMovieTitle(updatedValue.title);
        setUpdatedDescription(updatedValue.description);
        setUpdatedRating(updatedValue.rating);
        props.getMovies();
    };

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedDetails: IMovieDetailsType = {
            _id: props._id,
            image: emptyImage ? prevImage : updatedImage,
            title: emptyTile ? prevTitle : updatedMovieTitle,
            description: emptyDesc ? prevDescription : updatedDescription,
            rating: emptyRating ? prevRating : updatedRating,
            date: props.date,
        };

        const movieUpdated = (await updateMovieRequest(updatedDetails)) as AxiosResponse;
        if (movieUpdated.status == 200 && props.getterProps) {
            updatedMovieDetails(movieUpdated.data);
            Swal.fire({
                icon: "success",
                text: "Movie Updated!",
            });
            props.setterProps?.(false);
        }
        return console.log(movieUpdated);
    };

    return (
        <Transition.Root show={props.getterProps} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-20"
                initialFocus={cancelButtonRef}
                onClose={() => props.setterProps?.(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-100" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg p-3 shadow-gray-500 text-gray-300">
                                <form onSubmit={onSubmitHandler}>
                                    <div className="flex place-content-center">
                                        <Image
                                            src={updatedImage}
                                            alt={updatedImage}
                                            styles={
                                                "lg:rounded-r-none border-gray-400 max-h-[15em] max-w-[10em] flex-none bg-cover text-center overflow-hidden"
                                            }
                                        />
                                    </div>
                                    <ImageHandler
                                        imageGetter={updatedImage}
                                        imageSetter={setUpdateImage}
                                    />
                                    <Input
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                                        }
                                        label={"Movie Title"}
                                        type={"text"}
                                        setMovieTitle={setUpdatedMovieTitle}
                                        value={updatedMovieTitle}
                                        field={"title"}
                                    />
                                    <Input
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                                        }
                                        label={"Rating"}
                                        type={"number"}
                                        setRating={setUpdatedRating}
                                        value={updatedRating.toString()}
                                        field={"rating"}
                                    />
                                    <TextArea
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                                        }
                                        label={"Description"}
                                        type={"text"}
                                        setDescription={setUpdatedDescription}
                                        value={updatedDescription}
                                    />

                                    <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                                        <Button
                                            name="Update Movie"
                                            type="submit"
                                            styles="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        />
                                        <Button
                                            name="Cancel"
                                            type="button"
                                            styles="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClickFunction={() => props.setterProps?.(false)}
                                        />
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
