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
                "block w-full text-sm border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600"
            }
            label="Movie Poster"
            type="file"
            field="movieImage"
            setMovieImage={convertHandler}
            accept=".jpeg, .png, .jpg"
        />
    );
}
