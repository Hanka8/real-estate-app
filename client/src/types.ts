import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export interface FormLocationProps {
  estateType: string;
  district?: string;
  region?: string;
}

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
