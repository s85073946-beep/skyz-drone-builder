# SKYZ Drone Lab

Build a complete, fully functional SKYZ Drone Electrical Assembly Simulator in one build.

Use ONLY the real component images I upload. Never generate, replace, redraw, cartoonize, or substitute any component image. Do not show credits, attribution, source labels, or copyright text anywhere.

COMPONENTS

Use these exact uploaded components:

A2212/13T 1000KV BLDC Motor ×4

4-in-1 ESC ×1

Flight Controller ×1

LiPo Battery 3300mAh ×1

XT60 Connector ×1

Power Distribution Board ×1

GPS Module ×1

Radio Receiver ×1

Propellers ×4

OPENING

Create a 3–4 second professional intro:
dark graphite background → realistic drone smoothly appears/hovering → propellers subtly rotate → SKYZ → DRONE TECHNOLOGY → Drone Electrical Assembly Simulator → smooth transition into simulator.
Add Skip Intro.
No cartoon/AI-looking drone. Use a supplied real drone image if available.

MAIN UI

Create a professional dark graphite aerospace engineering interface:

Top: SKYZ, simulator title, stage, progress, timer

Left: real component library

Center: large assembly workspace

Right: connection instructions/status

Bottom: Reset, Hint, Check Assembly

No unnecessary circles, neon gaming effects, excessive gradients, or cartoon UI.

INTERACTION

Make every component draggable and repositionable.
Create real interactive connector points and SVG wires.
Wires must follow components when moved.

Correct connection = green.
Wrong connection = red + "Incorrect Connection".
Correct connections increase progress.

CONNECTION LOGIC

Validate:
Battery → XT60 → PDB → ESC power
ESC M1 → Motor 1
ESC M2 → Motor 2
ESC M3 → Motor 3
ESC M4 → Motor 4
Flight Controller → ESC signal
GPS → Flight Controller
Receiver → Flight Controller

Use only physically appropriate connector locations from the uploaded component images.

4 TRAINING STAGES

POWER — Battery, XT60, PDB

MOTORS — ESC and four motors

FLIGHT ELECTRONICS — FC, GPS, Receiver

FINAL SYSTEM CHECK

Unlock each stage after completing the previous stage.

After electrical completion, unlock PROPELLER INSTALLATION:
Propeller 1→Motor 1, Propeller 2→Motor 2, Propeller 3→Motor 3, Propeller 4→Motor 4.
Use drag/drop with alignment and snap.

GAME/LEARNING SYSTEM

Include:

Live progress %

Connection count

Timer

Score starting at 100

Penalty for wrong connections and hints

Hint button that highlights the required connector without doing it

Reset confirmation

Check Assembly validation

COMPLETION

When everything is correct show:

SYSTEM READY
SKYZ DRONE TECHNOLOGY
ASSEMBLY COMPLETE

Display score, time, correct connections, mistakes and hints used.
Buttons: Restart Simulation / Practice Again.

CUSTOM CURSOR

On desktop use a small realistic drone image as a custom mouse cursor with pointer-events:none.
Normal = hovering drone.
Hover = subtle scale.
Dragging = subtle change.
Correct connection = brief green effect.
Wrong connection = brief red effect.
Disable custom cursor on touch devices.

TECHNICAL

Use React + TypeScript + SVG.
Make all interactions genuinely functional, not a static mockup.
Use component-based architecture.
Optimize images and animations for smooth performance.
Make desktop/laptop/tablet responsive.

The final result must look like a real professional drone engineering training simulator using real hardware photographs, branded completely as SKYZ.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0528d791-c290-40c2-a3c6-2f77c8e32f3b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
