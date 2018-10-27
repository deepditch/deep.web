

export function mapTypeToDescription(type) {
  switch (type) {
    case "D00":
      return "Wheel Mark Part";
    case "D01":
      return "Construction Joint Part (Longitudinal)";
    case "D10":
      return "Equal interval";
    case "D11":
      return "Construction Joint Part (Lateral)";
    case "D20":
      return "Alligator Crack ";
    case "D40":
      return "Rutting, Bump, Pothole, or Separation";
    case "D43":
      return "White Line Blur";
    case "D44":
      return "Crosswalk blur";
    default:
      return type;
  }
}
