import type { Member } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * TEAM
 *
 * id        Unique id (referenced by projects.team).
 * name      Full name.
 * role      Club role ("President", "Mechanical Lead").
 * branch    e.g. "CSE", "ECE", "ME", "EE", "CE", "BT".
 * year      e.g. "3rd Year" or "Faculty".
 * tier      "faculty" | "core" | "lead" | "member".
 * photo     Optional override. Normally leave it out: drop "<id>.webp" into
 *            src/assets/photos/team/ (square, ≥ 400×400). Initials shown if missing.
 * skills    Shown on the back of the badge.
 * socials   Optional profile URLs.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS — never put real names here without consent.
 */
const items: Member[] = [
  {
    id: "faculty-01",
    name: "soumyata",
    role: "member",
    branch: "Dept. TBA",
    year: "Faculty",
    tier: "faculty",
    skills: ["Mentorship", "Control Systems"],
  },
  {
    id: "member-01",
    name: "Uday Pant",
    role: "President",
    branch: "ECE",
    year: "4th Year",
    tier: "core",
    skills: ["Embedded C", "PCB Design", "Leadership"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-02",
    name: "Aadarsh",
    role: "Vice President",
    branch: "ME",
    year: "4th Year",
    tier: "core",
    skills: ["SolidWorks", "Fabrication"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-03",
    name: "Vaibhav Pokhriyal",
    role: "Embedded Lead",
    branch: "EE",
    year: "3rd Year",
    tier: "lead",
    skills: ["STM32", "RTOS", "Sensors"],
    socials: { linkedin: "https://www.linkedin.com/in/vaibhav-pokhriyal-a8b08023a/", github: "https://github.com/vaibhav668" },
  },
  {
    id: "member-04",
    name: "Rahul Joshi",
    role: "Vision Lead",
    branch: "CSE",
    year: "3rd Year",
    tier: "lead",
    skills: ["OpenCV", "Python", "ROS"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-05",
    name: "Priyanshu Shah",
    role: "Drones Lead",
    branch: "ECE",
    year: "3rd Year",
    tier: "lead",
    skills: ["Betaflight", "Soldering"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/Priyanshuofficial1" },
  },
  {
    id: "member-06",
    name: "Priyanshu Nautiyal",
    role: "Member",
    branch: "CSE",
    year: "3rd Year",
    tier: "member",
    skills: ["Arduino", "C++"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-07",
    name: "Priya Maurya",
    role: "Member",
    branch: "ME",
    year: "3rd Year",
    tier: "member",
    skills: ["Fusion 360", "3D Printing"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-08",
    name: "Rishika",
    role: "Member",
    branch: "CE",
    year: "3rd Year",
    tier: "member",
    skills: ["Curiosity"],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-09",
    name: "Aman Malik",
    role: "Member",
    branch: "CSE",
    year: "3rd Year",
    tier: "member",
    skills: [],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-10",
    name: "Ayush Dilwan",
    role: "Member",
    branch: "CSE",
    year: "3rd Year",
    tier: "member",
    skills: [],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-11",
    name: "Aadarsh Kumar",
    role: "Member",
    branch: "ME",
    year: "3rd Year",
    tier: "member",
    skills: [],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-12",
    name: "Yash Saini",
    role: "Member",
    branch: "CE",
    year: "3rd Year",
    tier: "member",
    skills: [],
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
];

/** Photos are matched by id from src/assets/photos/team/ (see src/assets/photos/README.md). */
export const team: Member[] = withPhotos("team", items, "photo");
