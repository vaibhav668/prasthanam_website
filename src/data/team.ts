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
    id: "member-01",
    name: "Uday Pant",
    branch: "ME",
    year: "4th Year",
    socials: { linkedin: "https://www.linkedin.com/in/uday-pant-78b16028a/" },
  },
  {
    id: "pranjul",
    name: "pranjul Jamini",
    branch: "EE",
    year: "4th Year",
    socials: { linkedin: "https://www.linkedin.com/in/pranjaljamni/" },
  },
  {
    id: "member-03",
    name: "Vaibhav Pokhriyal",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/vaibhav-pokhriyal-a8b08023a/" },
  },
  {
    id: "member-10",
    name: "Ayush Dilwan",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/ayush-dilwan-107879325/" },
  },
  {
    id: "member-02",
    name: "Aadarsh",
    branch: "EE",
    year: "4th Year",
    socials: { linkedin: "https://www.linkedin.com/in/adarsh-kr-bhagat-abb95940b/" },
  },
  {
    id: "member-04",
    name: "Rahul Joshi",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/rahul-joshi-6a0526278/" },
  },
  {
    id: "member-05",
    name: "Priyanshu Shah",
    branch: "CSE",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/priyanshu-shah-757647405/" },
  },

  {
    id: "member-07",
    name: "Priya Maurya",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/priya-maurya-76076622a/" },
  },
  {
    id: "member-08",
    name: "Rishika",
    branch: "EE",
    year: "3rd Year",
  },
  {
    id: "member-09",
    name: "Aman Malik",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/aman-malik-503a3b317/" },
  },
  {
    id: "member-12",
    name: "Yash Saini",
    branch: "EE",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/yash-saini-nx/" },
  },
  {
    id: "member-06",
    name: "Priyanshu Nautiyal",
    branch: "AIML",
    year: "3rd Year",
    socials: { linkedin: "https://www.linkedin.com/in/priyanshu-nautiyal-9a011b306/" },
  },
];

/** Photos are matched by id from src/assets/photos/team/ (see src/assets/photos/README.md). */
export const team: Member[] = withPhotos("team", items, "photo").map((m) => ({
  ...m,
  role: m.role ?? "Member",
  tier: m.tier ?? "member",
  skills: m.skills ?? [],
}));
