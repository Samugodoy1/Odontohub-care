"use client";

import { useState, type FormEvent } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InterestFormProps = {
  professionalName: string;
  professionalSlug: string;
  intentLabel?: string;
};

export function InterestForm({
  professionalName,
  professionalSlug,
  intentLabel,
}: InterestFormProps) {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          neighborhood: form.get("neighborhood"),
          message: form.get("message"),
          professionalSlug,
          intentLabel,
        }),
      });
      if (!response.ok) {
        throw new Error("send-failed");
      }
      setSent(true);
    } catch {
      setError("Não foi possível enviar agora. Tente de novo em instantes.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[28px] bg-care-sage-soft px-6 py-8 text-care-sage-deep md:px-8">
        <p className="text-[13px] font-medium uppercase tracking-[0.12em]">Enviado</p>
        <h2 className="mt-2 text-[24px] font-semibold tracking-tight">Recebemos o seu interesse.</h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed">
          {professionalName} usa o OdontoHub. A clínica entra em contato para combinar o horário.
          Nada de leilão, nada de ranking pago.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-6 ring-1 ring-care-line md:p-8">
      <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-care-muted">
        Interesse
      </p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-care-ink">
        Pedir contato
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-care-muted">
        A clínica vê o pedido no mesmo sistema em que organiza a agenda. Sem cadastro de paciente
        neste site.
      </p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="h-11 rounded-2xl border border-care-line bg-care-wash px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-care-sage/40"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">WhatsApp</Label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 90000-0000"
            className="h-11 rounded-2xl border border-care-line bg-care-wash px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-care-sage/40"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="neighborhood">Bairro</Label>
          <input
            id="neighborhood"
            name="neighborhood"
            autoComplete="address-level3"
            className="h-11 rounded-2xl border border-care-line bg-care-wash px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-care-sage/40"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="message">O que está acontecendo</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={intentLabel ? `Estou procurando ajuda com: ${intentLabel}` : ""}
            className="min-h-24 rounded-2xl border-care-line bg-care-wash text-[15px]"
          />
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-[14px] text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="care-btn mt-6 w-full disabled:opacity-60">
        {pending ? "Enviando…" : "Enviar interesse"}
      </button>
    </form>
  );
}
