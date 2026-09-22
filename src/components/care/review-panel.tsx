"use client";

import { useEffect, useState, type FormEvent } from "react";

import {
  mentionedHighlights,
  REVIEW_HIGHLIGHTS,
  type PatientReview,
  type ReviewHighlightId,
} from "@/lib/reviews/review";

type ReviewPanelProps = {
  professionalSlug: string;
  professionalName: string;
};

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ReviewPanel({ professionalSlug, professionalName }: ReviewPanelProps) {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [highlights, setHighlights] = useState<ReviewHighlightId[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const response = await fetch(`/api/avaliacoes?slug=${encodeURIComponent(professionalSlug)}`);
      if (!response.ok) return;
      const payload = (await response.json()) as { reviews?: PatientReview[] };
      if (active) setReviews(payload.reviews ?? []);
    }
    void load();
    return () => {
      active = false;
    };
  }, [professionalSlug]);

  function toggle(id: ReviewHighlightId) {
    setHighlights((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professionalSlug,
          authorName: form.get("authorName"),
          comment: form.get("comment"),
          highlights,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; review?: PatientReview };
      if (!response.ok || !payload.review) {
        throw new Error(payload.error || "send-failed");
      }
      setReviews((current) => {
        const without = current.filter((item) => item.id !== payload.review?.id);
        return [payload.review as PatientReview, ...without];
      });
      setHighlights([]);
      setSent(true);
      event.currentTarget.reset();
    } catch (cause) {
      setError(cause instanceof Error && cause.message !== "send-failed"
        ? cause.message
        : "Não foi possível publicar agora.");
    } finally {
      setPending(false);
    }
  }

  const themes = mentionedHighlights(reviews);

  return (
    <section id="avaliacoes" className="mt-10 scroll-mt-20">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
        Avaliações
      </h2>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[#6e6e73]">
        Relatos de quem passou com {professionalName}. Sem nota e sem estrelas — o comentário não
        muda a posição na lista.
      </p>

      {themes.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {themes.map((theme) => (
            <li
              key={theme.id}
              className="rounded-full bg-[#eaf3fb] px-3 py-1 text-[13px] text-[#0071e3]"
            >
              {theme.label}
            </li>
          ))}
        </ul>
      ) : null}

      {reviews.length === 0 ? (
        <p className="mt-6 text-[15px] text-[#86868b]">Ainda não há relatos neste perfil.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-[24px] bg-white px-5 py-4 ring-1 ring-[#eeeef0]">
              <p className="text-[15px] font-medium text-[#1d1d1f]">{review.authorName}</p>
              <p className="mt-1 text-[13px] text-[#86868b]">{formatWhen(review.createdAt)}</p>
              {review.highlights.length > 0 ? (
                <p className="mt-3 text-[13px] text-[#6e6e73]">
                  {review.highlights
                    .map((id) => REVIEW_HIGHLIGHTS.find((item) => item.id === id)?.label)
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              ) : null}
              <p className="mt-3 text-[16px] leading-relaxed text-[#1d1d1f]">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="mt-8 rounded-[28px] bg-white p-6 ring-1 ring-[#d2d2d7]/80">
        <h3 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f]">Contar como foi</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
          Escolha o que marcou a consulta, se quiser, e escreva o relato. Não há nota numérica.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="O que marcou a consulta">
          {REVIEW_HIGHLIGHTS.map((item) => {
            const selected = highlights.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(item.id)}
                className={`rounded-full px-3 py-1.5 text-[13px] ring-1 transition-colors ${
                  selected
                    ? "bg-[#0071e3] text-white ring-[#0071e3]"
                    : "bg-white text-[#1d1d1f] ring-[#d2d2d7] hover:ring-[#0071e3]/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <label className="mt-5 grid gap-1.5 text-[14px] text-[#1d1d1f]">
          Seu nome
          <input
            name="authorName"
            required
            autoComplete="name"
            className="h-11 rounded-2xl border border-[#d2d2d7] bg-[#f5f5f7] px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/30"
          />
        </label>
        <label className="mt-4 grid gap-1.5 text-[14px] text-[#1d1d1f]">
          Relato
          <textarea
            name="comment"
            required
            minLength={20}
            maxLength={800}
            rows={4}
            placeholder="Como foi o atendimento, com suas palavras."
            className="min-h-28 rounded-2xl border border-[#d2d2d7] bg-[#f5f5f7] px-3 py-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/30"
          />
        </label>
        {error ? (
          <p className="mt-3 text-[14px] text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}
        {sent ? (
          <p className="mt-3 text-[14px] text-[#0071e3]" role="status">
            Relato publicado neste perfil.
          </p>
        ) : null}
        <button type="submit" disabled={pending} className="care-btn mt-5 w-full disabled:opacity-60">
          {pending ? "Publicando…" : "Publicar relato"}
        </button>
      </form>
    </section>
  );
}
