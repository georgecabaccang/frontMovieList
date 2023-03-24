import React from "react";

interface ButtonProps {
    styles?: string;
    type: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
    name: string;
    onClickFunction?: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className={props.styles}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClickFunction}
        >
            {props.name}
        </button>
    );
}
