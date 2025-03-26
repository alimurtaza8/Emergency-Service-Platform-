// utils/membership.ts (example file, or inline in process-payment)
import type { MembershipTier } from "@/lib/canister";

export function mapPlanNameToMembershipTier(planName: string): MembershipTier {
  // Simple examples:
  // Adjust logic to match your actual plan naming
  switch (planName.toLowerCase()) {
    case "single diamond":
      return { Basic: null };
    case "double diamond":
      return { Standard: null };
    case "triple diamond":
      return { Premium: null };
    case "professional":
      return { Professional: null };
    case "enterprise":
      return { Enterprise: null };
    default:
      // If plan is unknown, fallback to Free or handle error
      return { Free: null };
  }
}
