export function mapTypeToDescription(type) {
  switch (type) {
    case "D00":
      return "Wheel Mark Part";
    case "D01":
      return "Construction Joint Part (Longitudinal)";
    case "D10":
      return "Equal Interval";
    case "D11":
      return "Construction Joint Part (Lateral)";
    case "D20":
      return "Alligator Crack";
    case "D40":
      return "Rutting, Bump, Pothole, or Separation";
    case "D43":
      return "White Line Blur";
    case "D44":
      return "Crosswalk Blur";
    default:
      return type;
  }
}

export function mapStatusToString(status) {
  switch (status) {
    case "wont-do":
      return "Won't Repair";
    case "pending-repair":
      return "Needs Repair";
    case "repairing":
      return "Repair in Progress";
    case "done":
      return "Repaired";
  }
}
