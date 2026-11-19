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
 * image        Optional override. Normally leave it out: drop "<id>.webp" into
 *              src/assets/photos/projects/ and it is picked up automatically.
 * github/video Optional links.
 * team         Optional member ids from data/team.ts.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS.
 */
const items: Project[] = [
  {
    id: "leopard_detection_alert2",
    title: "Leopard_detection_alert",
    tagline: "SAMPLE — PID-tuned bot that reads the track at speed.",
    description:
      "SAMPLE PROJECT. Replace this with a real write-up: what problem it solved, what broke, what you learned. A line follower with an IR sensor array and a tuned PID loop is a classic first build.",
    year: 2026,
    status: "completed",
    verse: "blueprint",
    tech: ["Arduino", "PID", "IR Array"],
    specs: [
      { label: "MCU", value: "ATmega328P" },
      { label: "Sensors", value: "8× IR" },
      { label: "Top speed", value: "TBA" },
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
    status: "ongoing",
    verse: "comic",
    tech: ["OPENCV", "YOLOV8", "PYTHON","FASTAPI"],
    specs: [
     
    ],
    team: ["member-02"],
  },
  {
    id: "sample-vision-arm",
    title: "Sample Vision Arm",
    tagline: "SAMPLE — 4-DOF arm that sorts objects by colour.",
    description:
      "SAMPLE PROJECT. A small robotic arm with a camera that detects and sorts coloured blocks. Replace with your real build.",
    year: 2025,
    status: "prototype",
    verse: "crt",
    tech: ["Raspberry Pi", "OpenCV", "Python", "Servo"],
    specs: [
      { label: "DOF", value: "4" },
      { label: "Camera", value: "Pi Cam v2" },
      { label: "Latency", value: "TBA" },
    ],
  },
  {
    id: "sample-quadcopter",
    title: "Sample Quadcopter",
    tagline: "SAMPLE — scratch-built quad for hill-terrain mapping.",
    description:
      "SAMPLE PROJECT. A quadcopter assembled from a bare frame and flight controller. Replace with real flight logs and photos.",
    year: 2025,
    status: "ongoing",
    verse: "thermal",
    tech: ["Drones", "Betaflight", "GPS"],
    specs: [
      { label: "Frame", value: "450 mm" },
      { label: "Flight time", value: "TBA" },
      { label: "FC", value: "TBA" },
    ],
  },
  {
    id: "sample-hexapod",
    title: "Sample Hexapod",
    tagline: "SAMPLE — six legs, tripod gait, one very patient coder.",
    description: "SAMPLE PROJECT. A legged walker built around inverse kinematics.",
    year: 2024,
    status: "completed",
    verse: "comic",
    tech: ["IK", "Servo", "ESP32"],
    specs: [
      { label: "Legs", value: "6" },
      { label: "Servos", value: "18" },
      { label: "Gait", value: "Tripod" },
    ],
  },
  {
    id: "sample-weather-node",
    title: "Sample Weather Node",
    tagline: "SAMPLE — solar sensor node logging hill weather.",
    description: "SAMPLE PROJECT. A low-power environment logger.",
    year: 2024,
    status: "prototype",
    verse: "blueprint",
    tech: ["ESP32", "LoRa", "Solar"],
    specs: [
      { label: "Range", value: "TBA" },
      { label: "Battery", value: "18650" },
      { label: "Interval", value: "5 min" },
    ],
  },
];

/** Photos are matched by id from src/assets/photos/projects/ (see src/assets/photos/README.md). */
export const projects: Project[] = withPhotos("projects", items, "image");
