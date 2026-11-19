import type { Member } from "../types/content";

/**
 * TEAM
 *
 * id        Unique id (referenced by projects.team).
 * name      Full name.
 * role      Club role ("President", "Mechanical Lead").
 * branch    e.g. "CSE", "ECE", "ME", "EE", "CE", "BT".
 * year      e.g. "3rd Year" or "Faculty".
 * tier      "faculty" | "core" | "lead" | "member" — controls grouping + badge style.
 * photo     Optional. "/images/team/<id>.webp" (square, ≥ 400×400). Initials shown if missing.
 * skills    Shown on the back of the badge.
 * socials   Optional profile URLs.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS — never put real names here without consent.
 */
export const team: Member[] = [
  {
    id: "faculty-01",
    name: "Faculty Coordinator",
    role: "Faculty Advisor",
    branch: "Dept. TBA",
    year: "Faculty",
    tier: "faculty",
    skills: ["Mentorship", "Control Systems"],
  },
  {
    id: "member-01",
    name: "Member Name",
    role: "President",
    branch: "ECE",
    year: "4th Year",
    tier: "core",
    skills: ["Embedded C", "PCB Design", "Leadership"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-02",
    name: "Member Name",
    role: "Vice President",
    branch: "ME",
    year: "4th Year",
    tier: "core",
    skills: ["SolidWorks", "Fabrication"],
    socials: { linkedin: "https://linkedin.com/" },
  },
  {
    id: "member-03",
    name: "Member Name",
    role: "Embedded Lead",
    branch: "EE",
    year: "3rd Year",
    tier: "lead",
    skills: ["STM32", "RTOS", "Sensors"],
    socials: { github: "https://github.com/" },
  },
  {
    id: "member-04",
    name: "Member Name",
    role: "Vision Lead",
    branch: "CSE",
    year: "3rd Year",
    tier: "lead",
    skills: ["OpenCV", "Python", "ROS"],
    socials: { github: "https://github.com/", instagram: "https://instagram.com/" },
  },
  {
    id: "member-05",
    name: "Member Name",
    role: "Drones Lead",
    branch: "ECE",
    year: "3rd Year",
    tier: "lead",
    skills: ["Betaflight", "Soldering"],
  },
  {
    id: "member-06",
    name: "Member Name",
    role: "Member",
    branch: "CSE",
    year: "2nd Year",
    tier: "member",
    skills: ["Arduino", "C++"],
  },
  {
    id: "member-07",
    name: "Member Name",
    role: "Member",
    branch: "ME",
    year: "2nd Year",
    tier: "member",
    skills: ["Fusion 360", "3D Printing"],
  },
  {
    id: "member-08",
    name: "Member Name",
    role: "Member",
    branch: "CE",
    year: "1st Year",
    tier: "member",
    skills: ["Curiosity"],
  },
];
