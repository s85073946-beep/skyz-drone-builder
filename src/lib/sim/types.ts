export type PortKind = "power" | "signal" | "mount";

export interface Port {
  id: string;
  label: string;
  kind: PortKind;
  /** fraction of component box */
  x: number;
  y: number;
}

export interface PartDef {
  id: string;
  name: string;
  short: string;
  img: string;
  w: number;
  h: number;
  stage: number;
  spec: string;
  ports: Port[];
  home: { x: number; y: number };
}

export interface LinkDef {
  id: string;
  from: string; // "partId:portId"
  to: string;
  stage: number;
  label: string;
}

export interface Placed {
  x: number;
  y: number;
}

export interface MadeLink {
  id: string;
  from: string;
  to: string;
}