import { Dispatch, SetStateAction } from "react";

export interface movieDetailsType {
    _id?: string;
    image: string;
    title: string;
    rating: number;
    description: string;
    date: number;
    getterProps?: boolean;
    setterProps?: Dispatch<SetStateAction<boolean>>;
}
