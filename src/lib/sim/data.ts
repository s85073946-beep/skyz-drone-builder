import type { LinkDef, PartDef } from "./types";

import escAsset from "@/assets/esc.png.asset.json";
import motorAsset from "@/assets/motor.png.asset.json";
import batteryAsset from "@/assets/battery.png.asset.json";
import pdbAsset from "@/assets/pdb.png.asset.json";
import receiverAsset from "@/assets/receiver.png.asset.json";
import gpsAsset from "@/assets/gps.png.asset.json";
import propAsset from "@/assets/prop.png.asset.json";
import xt60Asset from "@/assets/xt60.png.asset.json";
import fcAsset from "@/assets/fc.png.asset.json";

export const IMG = {
  esc: escAsset.url,
  motor: motorAsset.url,
  battery: batteryAsset.url,
  pdb: pdbAsset.url,
  receiver: receiverAsset.url,
  gps: gpsAsset.url,
  prop: propAsset.url,
  xt60: xt60Asset.url,
  fc: fcAsset.url,
};

export const WORKSPACE = { w: 1040, h: 760 };

export const STAGES = [
  { id: 1, name: "POWER", brief: "Battery, XT60 lead and Power Distribution Board." },
  { id: 2, name: "MOTORS", brief: "4-in-1 ESC power input and the four A2212 motors." },
  { id: 3, name: "FLIGHT ELECTRONICS", brief: "Flight controller, GPS and radio receiver." },
  { id: 4, name: "FINAL SYSTEM CHECK", brief: "Verify the complete electrical harness." },
  { id: 5, name: "PROPELLER INSTALLATION", brief: "Mount propeller 1-4 on motor 1-4." },
];

const motorPorts = [{ id: "in", label: "Phase leads", kind: "power" as const, x: 0.84, y: 0.1 }];

export const PARTS: PartDef[] = [
  {
    id: "battery",
    name: "LiPo Battery 3300mAh",
    short: "BATTERY",
    img: IMG.battery,
    w: 84,
    h: 145,
    stage: 1,
    spec: "3S 11.1V · 60C · XT60 discharge lead",
    home: { x: 60, y: 300 },
    ports: [{ id: "out", label: "Discharge lead", kind: "power", x: 0.2, y: 0.06 }],
  },
  {
    id: "xt60",
    name: "XT60 Connector",
    short: "XT60",
    img: IMG.xt60,
    w: 132,
    h: 90,
    stage: 1,
    spec: "Female XT60 · 14AWG silicone pigtail",
    home: { x: 210, y: 330 },
    ports: [
      { id: "in", label: "XT60 socket", kind: "power", x: 0.14, y: 0.8 },
      { id: "out", label: "Bare leads", kind: "power", x: 0.95, y: 0.16 },
    ],
  },
  {
    id: "pdb",
    name: "Power Distribution Board",
    short: "PDB",
    img: IMG.pdb,
    w: 196,
    h: 172,
    stage: 1,
    spec: "4 × T-plug outputs · battery input pads",
    home: { x: 410, y: 300 },
    ports: [
      { id: "in", label: "Battery input pads", kind: "power", x: 0.5, y: 0.95 },
      { id: "out", label: "Distribution output", kind: "power", x: 0.2, y: 0.16 },
    ],
  },
  {
    id: "esc",
    name: "4-in-1 ESC",
    short: "ESC",
    img: IMG.esc,
    w: 136,
    h: 149,
    stage: 2,
    spec: "4 × 30A BLHeli · BAT / M1-M4 / signal pads",
    home: { x: 452, y: 520 },
    ports: [
      { id: "bat", label: "BAT pads", kind: "power", x: 0.46, y: 0.96 },
      { id: "sig", label: "Signal header", kind: "signal", x: 0.2, y: 0.96 },
      { id: "m1", label: "M1 pads", kind: "power", x: 0.96, y: 0.24 },
      { id: "m2", label: "M2 pads", kind: "power", x: 0.96, y: 0.74 },
      { id: "m3", label: "M3 pads", kind: "power", x: 0.04, y: 0.24 },
      { id: "m4", label: "M4 pads", kind: "power", x: 0.04, y: 0.74 },
    ],
  },
  {
    id: "motor1",
    name: "A2212/13T 1000KV Motor 1",
    short: "MOTOR 1",
    img: IMG.motor,
    w: 78,
    h: 108,
    stage: 2,
    spec: "Brushless outrunner · 3 phase bullet leads",
    home: { x: 760, y: 130 },
    ports: motorPorts,
  },
  {
    id: "motor2",
    name: "A2212/13T 1000KV Motor 2",
    short: "MOTOR 2",
    img: IMG.motor,
    w: 78,
    h: 108,
    stage: 2,
    spec: "Brushless outrunner · 3 phase bullet leads",
    home: { x: 760, y: 300 },
    ports: motorPorts,
  },
  {
    id: "motor3",
    name: "A2212/13T 1000KV Motor 3",
    short: "MOTOR 3",
    img: IMG.motor,
    w: 78,
    h: 108,
    stage: 2,
    spec: "Brushless outrunner · 3 phase bullet leads",
    home: { x: 760, y: 470 },
    ports: motorPorts,
  },
  {
    id: "motor4",
    name: "A2212/13T 1000KV Motor 4",
    short: "MOTOR 4",
    img: IMG.motor,
    w: 78,
    h: 108,
    stage: 2,
    spec: "Brushless outrunner · 3 phase bullet leads",
    home: { x: 760, y: 630 },
    ports: motorPorts,
  },
  {
    id: "fc",
    name: "Flight Controller",
    short: "FC",
    img: IMG.fc,
    w: 112,
    h: 112,
    stage: 3,
    spec: "F-series MCU · UART / I2C breakout pads",
    home: { x: 260, y: 560 },
    ports: [
      { id: "esc", label: "ESC signal pads", kind: "signal", x: 0.5, y: 0.96 },
      { id: "gps", label: "GPS UART + I2C", kind: "signal", x: 0.04, y: 0.4 },
      { id: "rx", label: "RX header", kind: "signal", x: 0.96, y: 0.62 },
    ],
  },
  {
    id: "gps",
    name: "GPS Module",
    short: "GPS",
    img: IMG.gps,
    w: 124,
    h: 76,
    stage: 3,
    spec: "u-blox M8N with compass · 6-pin + 4-pin",
    home: { x: 70, y: 560 },
    ports: [{ id: "out", label: "GPS connectors", kind: "signal", x: 0.08, y: 0.82 }],
  },
  {
    id: "rx",
    name: "Radio Receiver",
    short: "RECEIVER",
    img: IMG.receiver,
    w: 130,
    h: 93,
    stage: 3,
    spec: "2.4GHz 6-channel · servo rail output",
    home: { x: 70, y: 130 },
    ports: [{ id: "out", label: "Channel pins", kind: "signal", x: 0.06, y: 0.55 }],
  },
];

export const PROPS = [1, 2, 3, 4].map((n) => ({
  id: `prop${n}`,
  name: `Propeller ${n}`,
  motor: `motor${n}`,
}));

export const LINKS: LinkDef[] = [
  { id: "l1", from: "battery:out", to: "xt60:in", stage: 1, label: "Battery discharge lead → XT60 socket" },
  { id: "l2", from: "xt60:out", to: "pdb:in", stage: 1, label: "XT60 leads → PDB battery pads" },
  { id: "l3", from: "pdb:out", to: "esc:bat", stage: 2, label: "PDB output → ESC BAT pads" },
  { id: "l4", from: "esc:m1", to: "motor1:in", stage: 2, label: "ESC M1 → Motor 1" },
  { id: "l5", from: "esc:m2", to: "motor2:in", stage: 2, label: "ESC M2 → Motor 2" },
  { id: "l6", from: "esc:m3", to: "motor3:in", stage: 2, label: "ESC M3 → Motor 3" },
  { id: "l7", from: "esc:m4", to: "motor4:in", stage: 2, label: "ESC M4 → Motor 4" },
  { id: "l8", from: "fc:esc", to: "esc:sig", stage: 3, label: "Flight controller → ESC signal header" },
  { id: "l9", from: "gps:out", to: "fc:gps", stage: 3, label: "GPS module → Flight controller UART" },
  { id: "l10", from: "rx:out", to: "fc:rx", stage: 3, label: "Receiver → Flight controller RX" },
];

export const TOTAL_TASKS = LINKS.length + PROPS.length;

export const partById = (id: string) => PARTS.find((p) => p.id === id)!;