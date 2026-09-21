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
    "h-11 rounded-2xl border border-[#d2d2d7] bg-[#f5f5f7] px-3 text-[15px] text-[#1d1d1f] outline-none placeholder:text-[#86868b] focus-visible:ring-2 focus-visible:ring-[#0071e3]/30";

  if (sent) {
    return (
      <div className="rounded-[28px] bg-[#eaf8ef] px-6 py-8 md:px-8">
        <p className="text-[13px] font-medium text-[#248a3d]">Enviado</p>
        <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
          A clínica vai falar com você.
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#3d5a45]">
          Pedimos contato para {professionalName}. Eles combinam o horário com você.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-6 ring-1 ring-[#d2d2d7]/80 md:p-8">
      <p className="text-[13px] font-medium text-[#0071e3]">Consulta</p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
        Pedir um horário
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#86868b]">
        A clínica recebe o seu recado e entra em contato. Sem cadastro aqui.
      </p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
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
            placeholder="(12) 90000-0000"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="neighborhood">Bairro</Label>
          <input
            id="neighborhood"
            name="neighborhood"
            autoComplete="address-level3"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="message">O que você precisa</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={intentLabel ? `Estou procurando: ${intentLabel}` : ""}
            className="min-h-24 rounded-2xl border-[#d2d2d7] bg-[#f5f5f7] text-[15px] text-[#1d1d1f]"
          />
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-[14px] text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="care-btn mt-6 w-full disabled:opacity-60">
        {pending ? "Enviando…" : "Pedir contato"}
      </button>
    </form>
  );
}
