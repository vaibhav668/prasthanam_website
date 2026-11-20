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
/** role / tier / skills are optional here; defaults are filled in below. */
type MemberInput = Omit<Member, "role" | "tier" | "skills"> & Partial<Pick<Member, "role" | "tier" | "skills">>;

const items: MemberInput[] = [
  {
    id: "pranjul",
    name: "pranjul Jamini",
    branch: "EE",
    year: "4th Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },

  {
    id: "member-01",
    name: "Uday Pant",
    branch: "ME",
    year: "4th Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-03",
    name: "Vaibhav Pokhriyal",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/vaibhav-pokhriyal-a8b08023a/", github: "https://github.com/vaibhav668" },
  },
  {
    id: "member-10",
    name: "Ayush Dilwan",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-02",
    name: "Aadarsh",
    branch: "EE",
    year: "4th Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-04",
    name: "Rahul Joshi",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-05",
    name: "Priyanshu Shah",
    branch: "CSE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/Priyanshuofficial1" },
  },
  {
    id: "member-06",
    name: "Priyanshu Nautiyal",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-07",
    name: "Priya Maurya",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-08",
    name: "Rishika",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-09",
    name: "Aman Malik",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  
  {
    id: "member-11",
    name: "Aadarsh Kumar",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
  {
    id: "member-12",
    name: "Yash Saini",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://linkedin.com/", github: "https://github.com/" },
  },
];

/** Photos are matched by id from src/assets/photos/team/ (see src/assets/photos/README.md). */
export const team: Member[] = withPhotos("team", items, "photo").map((m) => ({
  ...m,
  role: m.role ?? "Member",
  tier: m.tier ?? "member",
  skills: m.skills ?? [],
}));
