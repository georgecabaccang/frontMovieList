import React, { Dispatch, SetStateAction, ChangeEvent } from "react";

interface TextAreaProps<T> {
    styles: string;
    type: string;
    label: string;
    value?: string;
    setDescription?: Dispatch<SetStateAction<string>>;
}

export default function TextArea(props: TextAreaProps<string | number>) {
    return (
        <div>
            <label>{props.label}</label>
            <textarea
                className={props.styles}
                style={{ minWidth: "100%" }}
                value={props.value}
                rows={5}
                maxLength={500}
                onChange={(event) => props.setDescription?.(event.target.value)}
            />
        </div>
    );
}
