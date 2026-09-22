import type { ReviewDraft } from "@/lib/reviews/review";
import { addReviewToHub, listReviewsFromHub } from "@/lib/reviews/hub";

export const reviewRepository = {
  list(professionalSlug?: string) {
    return listReviewsFromHub(professionalSlug);
  },
  add(draft: ReviewDraft) {
    return addReviewToHub(draft).then((result) => {
      if (!result.ok) {
        throw new Error(result.error);
      }
      return { created: result.created, review: result.review };
    });
  },
};
