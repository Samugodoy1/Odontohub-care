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
  { href: "/#tratamentos", label: "Tratamentos" },
  { href: "/#qualidade", label: "Como escolhemos" },
  { href: "/para-dentistas", label: "Sou dentista" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d2d2d7]/70 bg-[#f5f5f7]/80 backdrop-blur-xl">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#1d1d1f] focus:px-4 focus:py-2 focus:text-white"
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
              className="text-[12px] text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f]"
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
              className="text-[#1d1d1f] hover:bg-black/5 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white text-[#1d1d1f]">
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
                  className="text-[17px] text-[#1d1d1f]"
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
