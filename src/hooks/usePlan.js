import { useState } from "react";

const DEV_KEY = "pictune-dev-pro";

// Lifetime access will come from the signed-in account once the backend supports it.
// Until then everyone is on Free. In development only, open any page with ?pro=1
// (or ?pro=0) to preview the unlocked Pro UI.
function readDevPlan() {
  if (!import.meta.env.DEV) return false;
  try {
    const flag = new URLSearchParams(window.location.search).get("pro");
    if (flag === "1" || flag === "0") sessionStorage.setItem(DEV_KEY, flag);
    return sessionStorage.getItem(DEV_KEY) === "1";
  } catch {
    return false;
  }
}

export function usePlan() {
  const [isPro] = useState(readDevPlan);
  return { isPro, plan: isPro ? "lifetime" : "free" };
}
