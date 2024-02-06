/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/doctors",
  "/articles",
  "/auth/new-verification",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * The base url for admin dashboard
 * @type {string}
 */
export const ADMIN_DASHBOARD = "/protected/ad-dashboard";

/**
 * The base url for doctor url
 * @type {string}
 */
export const DOCTOR_DASHBOARD = "/dr-dashboard";

/**
 * The base url for doctor url
 * @type {string}
 */
export const USER_DASHBOARD = "/dashboard";
