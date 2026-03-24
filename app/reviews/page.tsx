"use client";

import { ReviewsHero } from "./_components/ReviewsHero";
import { ReviewsList } from "./_components/ReviewsList";
import { ReviewModal } from "./_components/ReviewModal";
import { useReviews } from "./_hooks/useReviews";
import { useReviewForm } from "./_hooks/useReviewForm";
import { useReviewsPage } from "./_hooks/useReviewsPage";
import { useAuth } from "../context/useAuth";

export default function Page() {
  const { user } = useAuth();
  const { reviews, avg, count, loading, errorMsg, fetchApproved } = useReviews();
  const form = useReviewForm(user);

  const page = useReviewsPage({
    errorMsg,
    fetchApproved,
    submitReview: form.submitReview,
    resetForm: form.reset,
  });

  return (
    <div className="space-bg min-h-dvh text-white" data-testid="reviews-page">
      <ReviewsHero
        avg={avg}
        count={count}
        onOpen={page.openModal}
        notice={page.pageNotice}
        onCloseNotice={() => page.setPageNotice(null)}
      />

      <div data-testid="reviews-list-section">
        <ReviewsList
          reviews={reviews}
          loading={loading}
          onRefresh={fetchApproved}
        />
      </div>

      <ReviewModal
        open={page.open}
        onClose={page.closeModal}
        submitting={form.submitting}
        isLogged={form.isLogged}
        computedLockedName={form.computedLockedName}
        rating={form.rating}
        setRating={form.setRating}
        displayName={form.displayName}
        setDisplayName={form.setDisplayName}
        email={form.email}
        setEmail={form.setEmail}
        phone={form.phone}
        setPhone={form.setPhone}
        comment={form.comment}
        setComment={form.setComment}
        MAX_FILES={form.MAX_FILES}
        pickedFiles={form.pickedFiles}
        previews={form.previews}
        onPickFiles={form.onPickFiles}
        removePicked={form.removePicked}
        onSubmit={page.handleSubmit}
        notice={page.modalNotice}
        onDismissNotice={() => page.setModalNotice(null)}
        uploadPct={form.uploadPct}
        maxCommentChars={form.MAX_COMMENT_CHARS ?? 1000}
      />
    </div>
  );
}