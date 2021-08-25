export function stringToBoolean(s: string) {
  switch (s.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    default:
      return false;
  }
}