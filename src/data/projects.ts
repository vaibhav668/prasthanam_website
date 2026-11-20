import type { Project } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * PROJECTS — "Multiverse of Builds".
 *
 * id           Unique, url-safe ("line-follower-v2").
 * title        Project name.
 * tagline      One line shown on the card.
 * description  Longer text shown in the project modal.
 * year         Year built.
 * status       "completed" | "ongoing" | "prototype"  (used by the filter).
 * verse        Card art style: "blueprint" | "comic" | "crt" | "thermal".
 * tech         Tech tags (also used by the filter).
 * specs        Label/value pairs shown as a spec sheet.
 * imagePosition Optional card-crop focus, e.g. "50% 90%" (x y). Default centred.
 * image        Optional override. Normally leave it out: drop "<id>.webp" into
 *              src/assets/photos/projects/ and it is picked up automatically.
 * github/video Optional links.
 * team         Optional member ids from data/team.ts.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
const items: Project[] = [
  {
    id: "micromouse",
    title: "MicroMouse",
    tagline: "Autonomous maze solver — flood-fill pathfinding with PID-tuned motion.",
    description:
      "An autonomous micromouse that explores an unknown maze and solves it with the flood-fill algorithm. Time-of-flight (ToF) sensors measure the distance to the walls, an ESP32 runs the mapping and decision logic, and a TB6612FNG driver powers the motors. A PID controller keeps the bot centred in the corridors and its turns precise.",
    year: 2026,
    status: "completed",
    verse: "blueprint",
    tech: ["ESP32", "Flood Fill", "PID", "ToF", "TB6612FNG"],
    specs: [
      { label: "Controller", value: "ESP32" },
      { label: "Motor driver", value: "TB6612FNG" },
      { label: "Sensors", value: "ToF distance sensors" },
      { label: "Algorithm", value: "Flood fill" },
      { label: "Control", value: "PID (tuned)" },
    ],
    team: ["member-01", "member-03"],
  },
  {
    id: "leopard_detection_alert",
    title: "Leopard_detection_alert",
    tagline: "Real-time leopard detection with instant campus alerts.",
    description:
      "SAMPLE PROJECT. A combat robot built for arena events. Describe the drive train, the weapon, and the one match where everything went wrong.",
    year: 2026,
    status: "completed",
    verse: "comic",
    tech: ["OPENCV", "YOLOV8", "PYTHON","FASTAPI"],
    specs: [
     
    ],
    team: ["member-02"],
  },
  {
    id: "virtual-steering-car",
    title: "Virtual Steering Car",
    tagline: "Drive a car with your bare hands — a virtual steering wheel in the air.",
    description:
      "A gesture-controlled car with no physical controller. A webcam feed is processed with OpenCV and MediaPipe hand tracking, a virtual steering wheel is drawn on screen, and the angle of your hands becomes the steering input. Python sends the commands to an ESP32 on the car, which drives it in real time.",
    year: 2026,
    status: "completed",
    verse: "crt",
    tech: ["OpenCV", "MediaPipe", "ESP32", "Python"],
    specs: [
      { label: "Input", value: "Hand gestures (webcam)" },
      { label: "Vision", value: "OpenCV + MediaPipe" },
      { label: "Controller", value: "ESP32" },
      { label: "Host", value: "Python" },
    ],
  },
  {
    id: "sign-language-glove",
    imagePosition: "50% 75%",
    title: "Sign Language Glove",
    tagline: "A wearable glove that turns hand signs into readable text.",
    description:
      "A smart glove that translates sign language gestures into text. Flex sensors along the fingers measure how far each finger is bent, an ESP32 reads those values and recognises the sign being made, and the result is shown on an LCD mounted on the glove — so anyone can read what is being signed.",
    year: 2026,
    status: "completed",
    verse: "thermal",
    tech: ["ESP32", "Flex Sensors", "LCD", "Wearable"],
    specs: [
      { label: "Controller", value: "ESP32" },
      { label: "Sensors", value: "Flex sensors (per finger)" },
      { label: "Output", value: "LCD text display" },
      { label: "Form factor", value: "Wearable glove" },
    ],
  },
  {
    id: "netravaani",
    title: "NetraVaani",
    tagline: "Assistive communication for patients who can't speak — using blinks and wrist squeezes.",
    description:
      "NetraVaani is an assistive communication system for patients who are conscious but unable to speak or communicate verbally. It reads EEG, EMG and other biopotential signals through skin electrodes, identifies different signal patterns and combinations of wrist squeezes and eye blinks, and converts them into commands — letting patients communicate their needs without speaking or using conventional input devices. Built from electrode setup and live signal capture through processing, testing signal combinations and hardware debugging, it is now a working prototype.",
    year: 2026,
    status: "prototype",
    verse: "blueprint",
    tech: ["EEG", "EMG", "EOG", "Biopotential", "Signal Processing"],
    specs: [
      { label: "Signals", value: "EEG · EMG · EOG" },
      { label: "Input", value: "Eye blinks + wrist squeezes" },
      { label: "Sensing", value: "Skin electrodes" },
      { label: "Output", value: "Commands for patient needs" },
    ],
  },
  {
    id: "drone",
    title: "Drone",
    imagePosition: "50% 80%",
    tagline: "A quadcopter built by the team from the frame up.",
    description:
      "Our ongoing drone build: a quadcopter assembled by the team from a bare frame, motors and a flight controller, with the wiring, soldering and set-up done by hand. Work is still in progress.",
    year: 2026,
    status: "ongoing",
    verse: "thermal",
    tech: ["Drones", "Quadcopter", "Flight Controller", "BLDC"],
    specs: [
      { label: "Type", value: "Quadcopter" },
      { label: "Build", value: "Assembled in-house" },
      { label: "Status", value: "In progress" },
    ],
  },
];

/** Photos are matched by id from src/assets/photos/projects/ (see src/assets/photos/README.md). */
export const projects: Project[] = withPhotos("projects", items, "image");
