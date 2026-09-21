"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { CareMark } from "@/components/care/care-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/buscar", label: "Buscar" },
  { href: "/para-dentistas", label: "Para dentistas" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-care-surface/70 backdrop-blur-2xl backdrop-saturate-150">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-care-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-5">
        <CareMark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] text-care-ink/80 transition-colors hover:text-care-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/para-dentistas"
            className="text-[12px] text-care-sage transition-colors hover:text-care-sage-deep"
          >
            Rede OdontoHub
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <CareMark />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5 px-4" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[17px] text-care-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
