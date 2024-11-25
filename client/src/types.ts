import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue, UseFormRegister, FieldErrors, useForm } from "react-hook-form";

export type FormLocationProps = {
  estateType: string;
  district?: string;
  region?: string;
};

export type FormContactProps = {
  fullName: string;
  phone: string;
  email: string;
};

export type RegionSelectProps = {
  selectedRegion: string;
  setSelectedRegion: Dispatch<SetStateAction<RegionType>>;
};

export type DistrictSelectProps = {
  selectedRegion: RegionType;
  setValue: UseFormSetValue<FormLocationProps>;
};

export interface HandleRegionClickEvent
  extends React.MouseEvent<SVGPathElement, MouseEvent> {
  target: SVGPathElement & {
    getAttribute(name: string): string | null;
  };
}

export type RegionType =
  | "Hlavní město Praha"
  | "Středočeský kraj"
  | "Jihočeský kraj"
  | "Plzeňský kraj"
  | "Karlovarský kraj"
  | "Ústecký kraj"
  | "Liberecký kraj"
  | "Královéhradecký kraj"
  | "Pardubický kraj"
  | "Vysočina"
  | "Jihomoravský kraj"
  | "Olomoucký kraj"
  | "Zlínský kraj"
  | "Moravskoslezský kraj"
  | "";

export type StrokeLinecap = "round" | "inherit" | "butt" | "square";
export type StrokeLinejoin = "round" | "inherit" | "miter" | "bevel";

export type SvgProps = {
  viewBox: string;
  stroke: string;
  fill: string;
  strokeWidth: string;
  paths: string[];
  strokeLinecap?: StrokeLinecap;
  strokeLinejoin?: StrokeLinejoin;
};

export type EstateTypeOptionProps = {
  id: string;
  value: string;
  selectedType: string;
  register: UseFormRegister<FormLocationProps>;
  label: string;
  svgProps: SvgProps;
};

export type FormInputProps = {
  id: keyof FormContactProps;
  label: string;
  placeholder: string;
  register: ReturnType<typeof useForm<FormContactProps>>["register"];
  validation: object;
  errors: FieldErrors<FormContactProps>;
  type?: string;
}

