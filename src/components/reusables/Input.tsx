import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import "../../index.css";

const TITLE = "title";
const DESCRIPTION = "description";
const RATING = "rating";
const IMAGE = "movieImage";

interface InputProps<T> {
    styles?: string;
    type: string;
    label: string;
    value?: string | number;
    field: string;
    accept?: string;
    setMovieImage?: (image: File[]) => void;
    setMovieTitle?: Dispatch<SetStateAction<string>>;
    setDescription?: Dispatch<SetStateAction<string>>;
    setRating?: Dispatch<SetStateAction<number>>;
}

export default function Input(props: InputProps<string | number>) {
    const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (props.field) {
            case TITLE:
                props.setMovieTitle?.(event.target.value);
                break;
            case DESCRIPTION:
                props.setDescription?.(event.target.value);
                break;
            case RATING:
                props.setRating?.(+event.target.value);
                break;
            case IMAGE:
                props.setMovieImage?.(Array.from(event.target.files ?? []));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <label className="block">{props.label}</label>
            <input
                maxLength={50}
                className={props.styles}
                type={props.type}
                onChange={(event) => setInput(event)}
                min={props.field === RATING ? 1 : 0}
                max={props.field === RATING ? 5 : 0}
                value={props.value}
                accept={props.accept}
            />
        </div>
    );
}
