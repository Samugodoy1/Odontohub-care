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
  { href: "/#casos", label: "Casos" },
  { href: "/#qualidade", label: "Qualidade" },
  { href: "/para-dentistas", label: "Para dentistas" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Ir para o conteúdo
      </a>
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-5">
        <CareMark />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/buscar" className="care-btn h-7 px-3.5 text-[12px]">
            Encontrar dentista
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] border-white/10 bg-black text-white">
            <SheetHeader>
              <SheetTitle className="text-left text-white">
                <CareMark />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5 px-4" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[17px] text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/buscar" onClick={() => setOpen(false)} className="care-btn mt-2 w-fit">
                Encontrar dentista
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
