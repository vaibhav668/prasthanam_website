import type { TerminalCommand } from "../types/content";

/**
 * TERMINAL — easter-egg commands (press ` or ~, or click >_ in the navbar).
 *
 * cmd          Exact text the user types (case-insensitive).
 * description  Shown by `help`.
 * output       Lines printed as-is.
 * action       Built-in behaviour:
 *                help          → list every non-hidden command
 *                listProjects  → print projects from data/projects.ts
 *                listTeam      → print team from data/team.ts
 *                scrollToJoin  → close terminal and scroll to #join
 *                clear / exit
 * hidden       true → works, but isn't listed in help.
 */
export const terminalCommands: TerminalCommand[] = [
  { cmd: "help", description: "list available commands", action: "help" },
  {
    cmd: "whoami",
    description: "who are we?",
    output: [
      "prasthanam :: robotics club, GBPIET, Pauri Garhwal",
      "a web of builders. build · break · debug · repeat.",
    ],
  },
  { cmd: "ls projects", description: "list builds", action: "listProjects" },
  { cmd: "ls team", description: "list agents", action: "listTeam" },
  { cmd: "sudo join", description: "request access (opens the join form)", action: "scrollToJoin" },
  { cmd: "clear", description: "clear the screen", action: "clear" },
  { cmd: "exit", description: "close terminal", action: "exit" },
  { cmd: "p8", description: "", hidden: true, output: ["  /\\(o)/\\   P-8 says hi.", " /  |  |  \\  8 legs, 1 eye, 0 bugs (lies)."] },
  { cmd: "sudo rm -rf /", description: "", hidden: true, output: ["nice try. P-8 has bitten your sudo privileges."] },
];
