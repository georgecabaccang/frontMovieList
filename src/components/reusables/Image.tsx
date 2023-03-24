import React from "react";

interface PropsImage {
    styles?: string;
    src: string;
    alt: string;
}

export default function Image(props: PropsImage) {
    return <img className={props.styles} src={props.src} alt={props.alt} />;
}
