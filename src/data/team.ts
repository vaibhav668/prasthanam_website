import type { Member } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * TEAM
 *
 * id        Unique id (referenced by projects.team).
 * name      Full name.
 * branch    e.g. "CSE", "ECE", "ME", "EE", "CE", "BT".
 * year      e.g. "3rd Year" or "Faculty".
 * photo     Optional override. Normally leave it out: drop "<id>.webp" into
 *            src/assets/photos/team/ (square, ≥ 400×400). Initials shown if missing.
 * socials   Optional profile URLs.
 *
 * ALL ENTRIES BELOW ARE SAMPLE PLACEHOLDERS — never put real names here without consent.
 */
const items: Member[] = [
   '{
    id: "member-01",
    name: "Uday Pant",
    branch: "ECE",
    year: "4th Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
   },
   {
    id: "member-02",
    name: "Pranjul",
    branch: "ME",
    year: "4th Year",
    socials: { linkedin: "https://linkedin.com/", github:"https://github.com/"},
   },
   {
    id: "member-03",
    name: "Vaibhav Pokhriyal",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/vaibhav-pokhriyal-a8b08023a/" "github: "https://github.com/vaibhav668" },
   },
   {
    id: "member-04",
    name: "Rahul Joshi",
    branch: "CSE",
    year: "3rd Year",
    socials: { github: "https://github.com/", linkedin: "https://linkedin.com/" },
   },
   {
    id: "member-05",
    name: "Priyanshu Shah",
    branch: "ECE",
    year: "3rd Year",
    socials: { github: "https://github.com/Priyanshuofficial1" , github:"https://github.com/Priyanshuofficial1" "}
  },
  {
    id: "member-06",
    name: "Priyanshu Nautiyal",
    branch: "CSE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" }
  },
  {
    id: "member-07",
    name: "Priya Maurya",
    branch: "ME",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" }
  },
  {
    id: "member-08",
    name: "Rishika",
    branch: "CE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/"
  },
  {
    id: "member-9",
    name: "Aman Malik",
    branch: "CSE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/"
  }
  {
    id: "member-10",
    name: "Ayush Dilwan",
    branch: "CSE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" }
  },
  {
    id: "member-11",
    name: "Aadarsh Kumar",
    branch: "ME",
    year: "3rd Year",
    socials: { linkedin:
  },
  {
    id: "member-12",
    name: "Yash Saini",
    branch: "CE",
    year: "3rd Year",
    socials: { github: "https://github.com/" , linkedin: "https://linkedin.com/"}
  },
];

/** Photos are matched by id from src/assets/photos/team/ (see src/assets/photos/README.md). */
export const team: Member[] = withPhotos("team", items, "photo");
