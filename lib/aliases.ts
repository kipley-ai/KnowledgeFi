import { StaticImageData } from "next/image";

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type ImageSrc = string | StaticImageData;
