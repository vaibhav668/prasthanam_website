import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./useReducedMotion";

export type DeviceTier = "high" | "low";

let cached: DeviceTier | null = null;

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    const ok = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Decide once per session whether this device gets the full WebGL hero ("high")
 * or the CSS/SVG P-8 ("low").
 */
export function detectDeviceTier(): DeviceTier {
  if (cached) return cached;
  if (typeof window === "undefined") return "low";
  // Debug override: ?tier=low or ?tier=high
  const forced = new URLSearchParams(window.location.search).get("tier");
  if (forced === "low" || forced === "high") return (cached = forced);
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory ?? 4; // Safari/Firefox don't expose it
  const small = window.innerWidth < 900 || Math.min(window.innerWidth, window.innerHeight) < 600;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const saveData = nav.connection?.saveData === true || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");

  let tier: DeviceTier = "high";
  if (prefersReducedMotion() || saveData) tier = "low";
  else if (cores < 4 || memory < 4) tier = "low";
  // Phones / tablets / small windows get the SVG bot: it looks the same, costs ~0 JS,
  // and keeps budget Android phones smooth. Override with ?tier=high to test.
  else if (small || coarse) tier = "low";
  else if (!hasWebGL()) tier = "low";

  cached = tier;
  return tier;
}

export function useDeviceTier(): DeviceTier | null {
  // null on the first render so the hero paints instantly, then decide.
  const [tier, setTier] = useState<DeviceTier | null>(cached);
  useEffect(() => {
    if (!cached) setTier(detectDeviceTier());
  }, []);
  return tier;
}
