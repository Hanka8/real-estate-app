export type FormLocationProps = {
  propertyType: string;
  region: string;
  district: string;
};

export type FormContactProps = {
  fullName: string;
  phone: string;
  email: string;
};

export type MapFormProps = {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
};

export type DistrictFormProps = {
  selectedRegion: RegionType;
  setValue: (name: string, value: string) => void;
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
  | "Moravskoslezský kraj";
