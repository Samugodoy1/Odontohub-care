/**
 * OdontoHub Care design tokens.
 *
 * Heritage from OdontoHub Hub (odontohub.app.br):
 *   ink #1d1d1f, surface #f5f5f7, muted #86868b, line #d2d2d7,
 *   Inter with Apple-like tracking, generous type, almost no shadow.
 *
 * Care differentiates by light, patient-facing calm. Hub launches in black
 * and speaks to the dentist. Care stays on paper and speaks to the person
 * in the chair. The clinical green (#1F6B57) already lives in Hub's brand
 * kit; Care uses it as the primary accent instead of Apple blue (#0071e3).
 *
 * Surfaces of the family:
 *   Academy  — the box, the student
 *   Hub      — the consultório, operations
 *   Presença — the existing patient
 *   Care     — discovery, the person who does not yet have a dentist
 */

export const CARE_TOKENS = {
  color: {
    ink: "#1d1d1f",
    muted: "#86868b",
    gray2: "#6e6e73",
    surface: "#f5f5f7",
    elevated: "#ffffff",
    line: "#d2d2d7",
    sage: "#1F6B57",
    sageDeep: "#124438",
    sageMid: "#2A8A70",
    sageSoft: "#EAF4F0",
    wash: "#fbfbfd",
    hubBlue: "#0071e3",
    black: "#000000",
  },
  type: {
    family: 'Inter, "SF Pro Display", "SF Pro Text", "Helvetica Neue", ui-sans-serif, system-ui, sans-serif',
    trackingDisplay: "-0.025em",
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
