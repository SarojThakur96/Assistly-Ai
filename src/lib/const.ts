export const apiBaseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL!
    : "http://localhost:8000";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_URL!
    : "http://localhost:3000";
