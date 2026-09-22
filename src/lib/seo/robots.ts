import type { Metadata } from "next";

export const NOINDEX_FOLLOW: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
};
