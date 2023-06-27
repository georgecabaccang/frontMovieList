import React, { Dispatch, SetStateAction } from "react";
import Input from "./reusables/Input";

interface ImageProps {
    imageGetter: string;
    imageSetter: Dispatch<SetStateAction<string>>;
}

type Blob = {};

export default function ImageHandler(props: ImageProps) {
    // const [image64, setImage64] = useState<File[]>([]);

    const imageConverter = (image: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const convertHandler = async (image: File[]) => {
        const result = await imageConverter(image[0]);
        props.imageSetter(result as string);
    };

    return (
        <Input
            styles={
                "block w-full text-sm cursor-pointer file:px-5 file:border-none file:hover:bg-gray-300 file:rounded-l-md file:bg-gray-400 border border-gray-500 rounded-md"
            }
            label="Movie Poster"
            type="file"
            field="movieImage"
            setMovieImage={convertHandler}
            accept=".jpeg, .png, .jpg"
        />
    );
}
