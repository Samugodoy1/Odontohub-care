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

  const fieldClass =
    "h-11 rounded-2xl border border-white/12 bg-white/6 px-3 text-[15px] text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#0071e3]/50";

  if (sent) {
    return (
      <div className="rounded-[28px] bg-[#1d1d1f] px-6 py-8 md:px-8">
        <p className="text-[13px] font-medium text-[#30d158]">Enviado</p>
        <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-white">
          A clínica recebe no OdontoHub.
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
          {professionalName} usa o sistema. O pedido entra na mesma agenda em que a clínica já
          trabalha.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-[#1d1d1f] p-6 md:p-8">
      <p className="text-[13px] font-medium text-[#64d2ff]">Contato</p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-white">
        Falar com a clínica
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/50">
        Sem cadastro neste site. O dentista vê o pedido no OdontoHub.
      </p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name" className="text-white/70">
            Nome
          </Label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone" className="text-white/70">
            WhatsApp
          </Label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(12) 90000-0000"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="neighborhood" className="text-white/70">
            Bairro
          </Label>
          <input
            id="neighborhood"
            name="neighborhood"
            autoComplete="address-level3"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="message" className="text-white/70">
            O seu caso
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={intentLabel ? `Estou procurando: ${intentLabel}` : ""}
            className="min-h-24 rounded-2xl border-white/12 bg-white/6 text-[15px] text-white"
          />
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-[14px] text-[#ff8a80]" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="care-btn mt-6 w-full disabled:opacity-60">
        {pending ? "Enviando…" : "Enviar para a clínica"}
      </button>
    </form>
  );
}
