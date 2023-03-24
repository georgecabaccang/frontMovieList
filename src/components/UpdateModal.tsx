import React, {
    FormEvent,
    useContext,
    useState,
    Fragment,
    useRef,
} from "react";
import { MovieContext } from "../store/MovieContext";
import { movieDetailsType } from "../types/movieType";
import Button from "./reusables/Button";
import Input from "./reusables/Input";
import { updateMovie } from "./services/MoviesServices";
import ImageHandler from "./ImageHandler";

import { Dialog, Transition } from "@headlessui/react";
import TextArea from "./reusables/TextArea";

export default function UpdateModal(props: movieDetailsType) {
    const movieContext = useContext(MovieContext);
    const cancelButtonRef = useRef(null);

    const [updatedImage, setUpdateImage] = useState(props.image);
    const [updatedMovieTitle, setUpdatedMovieTitle] = useState(props.title);
    const [updatedRating, setUpdatedRating] = useState(props.rating);
    const [updatedDescription, setUpdatedDescription] = useState(
        props.description
    );

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

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedDetails: movieDetailsType = {
            _id: props._id,
            image: emptyImage ? prevImage : updatedImage,
            title: emptyTile ? prevTitle : updatedMovieTitle,
            description: emptyDesc ? prevDescription : updatedDescription,
            rating: emptyRating ? prevRating : updatedRating,
            date: props.date,
        };

        const movieUpdated = await updateMovie(updatedDetails);
        if (movieUpdated == true && props.getterProps) {
            movieContext.getMovies();
            return props.setterProps?.(false);
        }
        return console.log(movieUpdated);
    };

    return (
        <Transition.Root show={props.getterProps} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-3">
                                <form onSubmit={onSubmitHandler}>
                                    <ImageHandler
                                        imageGetter={updatedImage}
                                        imageSetter={setUpdateImage}
                                    />
                                    <Input
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        }
                                        label={"Movie Title"}
                                        type={"text"}
                                        setMovieTitle={setUpdatedMovieTitle}
                                        value={updatedMovieTitle}
                                        field={"title"}
                                    />
                                    <Input
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        }
                                        label={"Rating"}
                                        type={"number"}
                                        setRating={setUpdatedRating}
                                        value={updatedRating.toString()}
                                        field={"rating"}
                                    />
                                    <TextArea
                                        styles={
                                            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        }
                                        label={"Description"}
                                        type={"text"}
                                        setDescription={setUpdatedDescription}
                                        value={updatedDescription}
                                    />

                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Button
                                            name="Update Movie"
                                            type="submit"
                                        />
                                        <Button
                                            name="Cancel"
                                            type="button"
                                            onClickFunction={() =>
                                                props.setterProps?.(false)
                                            }
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
