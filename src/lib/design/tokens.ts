/**
 * OdontoHub Care — visual language.
 *
 * Reference: Apple Fitness+ marketing (apple.com/br/apple-fitness-plus):
 * black canvas, huge type, cinematic modules, horizontal galleries,
 * blue pill CTAs, sticky 48px nav, FAQ in large type.
 *
 * Care is not a gray SaaS landing. It is a patient product page:
 * the dossier of dentists who run the clinic on OdontoHub.
 *
 * Hub speaks to the dentist in black and Apple blue.
 * Care uses the same black canvas for the patient, with clinical
 * green only as the verified-network mark.
 */

export const CARE_TOKENS = {
  color: {
    ink: "#f5f5f7",
    inkOnLight: "#1d1d1f",
    muted: "#86868b",
    gray2: "#6e6e73",
    canvas: "#000000",
    surface: "#161617",
    elevated: "#1d1d1f",
    paper: "#f5f5f7",
    line: "#424245",
    sage: "#1F6B57",
    sageDeep: "#124438",
    sageMid: "#2A8A70",
    sageSoft: "#EAF4F0",
    blue: "#0071e3",
    blueHover: "#0077ed",
    hubBlue: "#0071e3",
    black: "#000000",
  },
  type: {
    family: 'Inter, "SF Pro Display", "SF Pro Text", "Helvetica Neue", ui-sans-serif, system-ui, sans-serif',
    trackingDisplay: "-0.028em",
    trackingBody: "-0.011em",
  },
  radius: {
    pill: "980px",
    card: "28px",
  },
  motion: {
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    duration: "700ms",
  },
} as const;
