import type { Achievement } from "../types/content";
import { withPhotos } from "../lib/photos";

/**
 * ACHIEVEMENTS — the trophy cabinet.
 *
 * id           Unique id.
 * title        What was achieved ("1st Place Champions — National Robowars Championship").
 * event        Where ("National Technical Symposium 2025").
 * year         Year (number).
 * position     Optional badge text ("1st Place", "Runner-up", "Finalist").
 * category     Optional small label above the title ("Combat Robotics (15kg category)").
 * description  Optional 1–2 sentences.
 * highlight    Optional footer line with a trophy icon ("National Champion").
 * image        Optional override. Normally leave it out: drop "<id>.webp" into
 *              src/assets/photos/achievements/ (16:10 works best). No photo → a drawn
 *              trophy is shown instead. Click a photo to open it full size.
 * medal        Optional "gold" | "silver" | "bronze" | "special" — the 3D medal.
 *              If omitted it's guessed from `position` (1st → gold, 2nd → silver, 3rd → bronze).
 * featured     Optional. true → shown as the big card at the top (use for one or two wins).
 * link         Optional { label, url } — news article, certificate, video.
 *
 * Only list real achievements. The first entry is taken from the old site's screenshot;
 * please verify it. The rest are SAMPLE placeholders.
 */
const items: Achievement[] = [
  {
    id: "ACH001",
    title: "3RD POSITION - NANO NAVIGATOR EVENT",
    event: "COGNIZANCE,IIT ROORKEE",
    year: 2026,
    position: "3rd Place",
    category: "MICRO MOUSE MAZE SOLVER",
    description: "Autonomous micro mouse robot engineered to solve complex grid Multi-link crawling locomotion bot designed and calibrated for all-mazes in real-time, securing 3rd position at IIT Roorkee's lagship terrain stability and obstacle traversal, clinching 3rd position. annual tech fest..",
    highlight: "National Champion",
    medal: "bronze",
    featured: false,
  },
  {
    id: "ACH002",
    title: "CRAWLOTRON EVENT",
    event: "COGNIZANCE,IIT ROORKEE",
    year: 2026,
    position: "3rd Place",
    category: "CRAWLING & MULTI-PEDAL ROBOTICS",
    description: "Multi-link crawling locomotion bot designed and calibrated for all-mazes in real-time, securing 3rd position at IIT Roorkee's flagshipterrain stability and obstacle traversal, clinching 3rd position.",
    
  },
  {
      id: "ACH0011",
      title: "2ND RUNNER UP - RC RACING",
      event: "GRAFEST, DEHRADUN",
      year: 2025,
      position: "2nd place",
      category: "RADIO CONTROL (RC) RACING",
      description: "High-Performance  custom RC race car engineered for maximum agility, high-speed acceleration, and precision track handeling, securing 2nd runner up.",
    },
  {
    id: "ACH003",
    title: "PLASMA PULL EVENT (TUG OF WAR)",
    event: "COGNIZANCE, IIT ROORKEE",
    year: 2026,
    position: "3rd Place",
    category: "ROBOTIC TUG OF WAR & HIGH-TORQUE COMBAT",
    description: "High-traction custom gear-reduction bot engineered with massiveSecured 3rd place solving complex cryptographic, binarypulling torque and high-friction contact treads for the robotic Tug ofexpoitation, web securiy, and reverse engineering challenges under War clash..",
  },  
    {
      id: "ACH006",
      title: "TECHNOXIAN WORLD ROBOTICS CHAMPIONSHIP 2024",
      event: "TECHNOXIAN, DELHI",
      year: 2024,
      // position: "3rd Place",
      category: "WORLD ROBOTICS CHAMPIONSHIP & COMBAT",
      description: "Represented GBPIET at Technoxian Delhi 2024, competing with custom-engineered robotics projects in national and international competitive arena clashes.",
    },{ 
      id: "ACH005",
      title: "ROBO SOCCER, LFR & WIKI RUN",
      event: "COGNIZANCE, IIT ROORKEE",
      year: 2026,
      // position: "3rd Place",
      category: "ROBO SOCCER . LINE FOLLOWER (LFR) . WIKI RUN",
      description: "Represented GBPIET across multiple competitive tracks at Cognizance 2026. , fielding high-speed Line Following Robots (LFR), securing 2nd runner up. wireless Robo Soccer bots, and Wiki Run algorithmic navigation.",
    },
    //  {
      //   id: "ACH006",
      //   title: "Sample: 3rd Place — Drone Obstacle Course",
      //   event: "Event Name TBA",
      //   year: 2024,
      //   position: "3rd Place",
      //   category: "Aerial Robotics",
      //   description: "SAMPLE — replace with a real result, or delete this entry.",
      // }, 
      
      {
        id: "ACH007",
        title: "ANNUAL TECHNICAL FEST - BIET JHANSI 2024",
        event: "BIET JHANSI",
        year: 2024,
    // position: "3rd Place",
    category: "INTER-COLLEGE ROBOTICS & INNOVATION",
    description: "Fielded autonomous line-followers and wireless robotics contingents at Bundelkhand Institute of Engineering & Technology (BIET) Jhansi.",
  },
{
    id: "ACH008",
    title: "COGNIZANCE 2024 FLAGSHIP ROBOTICS CLASH",
    event: "COGNIZANCE, IIT ROORKEE",
    year: 2024,
    // position: "3rd Place",
    category: "ROBOTICS & HARDWARE SYSTEMS",
    description: "Represented GBPIET across multiple robotics and autonomous challenge tracks at Cognizance 2024, the flagship annual techfestival of IIT Roorkee.",
  },
{
    id: "ACH009",
    title: "2ND POSITION - ROBO SOCCER EVENT",
    event: "TRYST, IIT DELHI",
    year: 2025,
    position: "2nd Place",
    category: "WIRELESS REMOTE ROBOTICS & ROBO SOCCER",
    description: "High-speed omni-directional drive striker and goalkeeper bots engineered for dynamic ball control and rapid defensive maneuvers, securing 2nd position at IIT Delhi.",
  },
{
    id: "ACH0010",
    title: "2ND POSITION - BLIND BOT EVENT",
    event: "TRYST, IIT DELHI",
    year: 2025,
    position: "2nd Place",
    category: "SENSOR -GUIDED BLIND NAVIGATION",
    description: "Custom sensor-assisted remote navigation robot operated under zero direct-sight conditions through precise pilot coordination and telemetry feedback, clinching 2nd position.",
  },

  {
    id: "ACH0012",
    title: "48 HOUR HACKTHON NATIONAL LEVEL",
    event: "GRAPHIC ERA, DEHRADUN",
    year: 2026,
    // position: "2nd place",
    category: "HACKTHON",
    featured: true,
    description: "MOST INNOVATING IDEA CATEOGRY WINNER",
  }
,{
id: "ACH004",
title: "CTF EVENT (CAPTURE THE FLAG)",
event: "COGNIZANCE, IIT ROORKEE",
year: 2026,
position: "3rd Place",
category: "CYBERSECURITY & SYSTEMS CTF",
description: "Secured 3rd place solving complex cryptographic, binary exploitation, web security, and reverse engineering challenges under War clash. intense time constraints.",
}
];

/** Photos are matched by id from src/assets/photos/achievements/ (see src/assets/photos/README.md). */
export const achievements: Achievement[] = withPhotos("achievements", items, "image");
