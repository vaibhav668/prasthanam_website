import type { Event } from "../types/content";
import { withPhotos } from "../lib/photos";
import { reportPdf, warnOrphanReports } from "../lib/reports";

/**
 * EVENTS — the web-thread timeline.
 *
 * id            Unique id.
 * title         Event name.
 * date          Year only, e.g. "2026".
 * type          "workshop" | "competition" | "fest" | "talk".
 * description   One or two sentences.
 * venue         Optional location.
 * registerLink  Optional URL. Shows a "Register" button on upcoming events.
 * image         Optional override. Normally leave it out: drop "<id>.webp" into
 *               src/assets/photos/events/ (16:9 works best).
 * status        "upcoming" | "past" — only decides whether the Register button shows. All events are listed together.
 * report        Optional. Adds a small "Report" button to the card that opens the report.
 *                 summary     what happened (a short paragraph)
 *                 highlights  optional bullet list (["42 participants", "Winner: Team X"])
 *                 pages / author   optional
 *                 file        PDF link. Normally leave it out: drop "<event id>.pdf" into
 *                             src/assets/reports/ and it is found automatically.
 *               An event with only a PDF in src/assets/reports/ also gets the button.
 *
 */
const raw: Event[] = [
  {
    id: "microcontrollers-coding-basics",
    title: "Microcontrollers & Coding Basics",
    date: "2026",
    type: "workshop",
    description: "Hands-on intro to Arduino UNO and Raspberry Pi: pinouts, GPIO, sensors, PWM and live breadboard prototyping.",
    status: "past",
    report: {
      summary:
        "A hands-on workshop on microcontroller boards and embedded coding. Participants worked with Arduino UNO and Raspberry Pi (hardware pinouts, internal architecture and GPIO interfacing), used ultrasonic, optical and display sensors, and learned core embedded C/C++ techniques — PWM, sensor polling and signal timing — through live breadboard prototyping, code uploading and hardware debugging.",
      highlights: ["Arduino UNO & Raspberry Pi", "GPIO, PWM, sensor polling & timing", "Live breadboard prototyping and debugging", "14 club members involved"],
    },
  },
  {
    id: "tinkercad-workshop",
    title: "Tinkercad Workshop",
    date: "2026",
    type: "workshop",
    description: "Design, simulate and program circuits and 3D models in Tinkercad — no physical hardware needed.",
    status: "past",
    report: {
      summary:
        "A hands-on session introducing students to 3D design, electronics, Arduino and circuit simulation using Tinkercad, Autodesk's beginner-friendly online platform. Participants learned to design simple 3D models, build and simulate circuits with LEDs, resistors, switches and sensors, program an Arduino with basic code, and turn an idea into a working prototype virtually.",
      highlights: ["3D design with basic shapes", "Virtual circuit design & simulation", "Basic Arduino programming", "14 club members present"],
    },
  },
  {
    id: "tinkercad-circuit-event",
    title: "Tinkercad Circuit Designing & Simulation Event",
    date: "2026",
    type: "competition",
    description: "A circuit design and simulation contest held after the Tinkercad workshop, with winners and runners-up.",
    status: "past",
    report: {
      summary: "A circuit designing and simulation competition on Tinkercad, held as a follow-up to the Tinkercad workshop. Teams designed and simulated their circuits, and the winners received certificates.",
      highlights: ["1st: Aadit Sharma & Paras", "1st runner-up: Bishal & Sarthak", "2nd runner-up: Abhinav & Shreyash"],
    },
  },
  {
    id: "drone-assembling-workshop",
    title: "Drone Assembling Workshop",
    date: "2026",
    type: "workshop",
    description: "Building a quadcopter from the frame up: motors, propellers, flight controller, ESCs, battery and wiring.",
    status: "past",
    report: {
      summary:
        "A multi-day workshop on drone assembly — putting together the frame, motors, propellers, flight controller, battery, electronic speed controllers (ESCs) and other electronic components to make a drone capable of flying. Day 2 covered soldering and wiring.",
      highlights: ["Frame, motors, propellers & ESCs", "Flight controller and battery set-up", "Soldering and wiring", "5 club members involved"],
    },
  },
  {
    id: "computer-vision-hardware-control",
    title: "Computer Vision Based Hardware Control",
    date: "2026",
    type: "workshop",
    description: "A camera detects gestures, colours or objects, and OpenCV + Arduino/ESP32 turn that into real hardware control.",
    status: "past",
    report: {
      summary:
        "A session on controlling physical hardware with computer vision. A camera captures video, OpenCV and Python detect something — a hand gesture, colour or object — a command is generated, and an Arduino or ESP32 drives motors, servos or LEDs. Covered OpenCV (object, colour, face, hand and motion detection, tracking), motors and servos, and USB/Serial, Bluetooth and Wi-Fi communication.",
      highlights: ["Camera → OpenCV → decision → hardware", "Object, colour, face & hand detection", "Arduino / ESP32 control of motors and servos", "USB/Serial, Bluetooth & Wi-Fi links"],
    },
  },
];

// Photos are matched by id from src/assets/photos/events/; report PDFs from src/assets/reports/.
const withReports = raw.map((e) => {
  const file = e.report?.file ?? reportPdf(e.id);
  return e.report || file ? { ...e, report: { ...e.report, file } } : e;
});
warnOrphanReports(raw.map((e) => e.id));

export const events: Event[] = withPhotos("events", withReports, "image");
