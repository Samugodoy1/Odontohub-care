import type { ProfessionalCard } from "@/lib/catalog/types";
import { shortNameOf } from "@/lib/catalog/names";
import { DentistPhoto } from "@/components/care/dentist-photo";

export function DeviceDossier({ dentists }: { dentists: ProfessionalCard[] }) {
  const slice = dentists.slice(0, 4);
  const city = slice[0]?.region.city || "sua cidade";

  return (
    <div className="care-float relative mx-auto w-[min(100%,280px)] md:w-[310px]">
      <div className="rounded-[40px] bg-[#ececf1] p-[10px] shadow-[0_32px_64px_rgba(15,23,42,0.14)]">
        <div className="overflow-hidden rounded-[30px] bg-white">
          <div className="flex h-8 items-center justify-center">
            <div className="h-[18px] w-[84px] rounded-full bg-[#1d1d1f]" />
          </div>
          <div className="px-4 pb-7 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0071e3]">Perto de você</p>
            <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#1d1d1f]">
              Dentistas em {city}
            </p>
            <p className="mt-1 text-[12px] text-[#86868b]">Selecionados pelo OdontoHub Care</p>
            <ul className="mt-4 space-y-2">
              {slice.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl bg-[#f4f4f5] px-2.5 py-2"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="size-11 overflow-hidden rounded-xl bg-[#d7e0e8]">
                    <DentistPhoto
                      name={item.name}
                      honorific={item.honorific}
                      photoUrl={item.photoUrl}
                      compact
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-[#1d1d1f]">
                      {shortNameOf(item)}
                    </p>
                    <p className="truncate text-[12px] text-[#86868b]">
                      {item.specialties[0]?.shortName} · {item.clinic.neighborhood}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
