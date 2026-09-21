import type { ProfessionalCard } from "@/lib/catalog/types";

export function DeviceDossier({ dentists }: { dentists: ProfessionalCard[] }) {
  const slice = dentists.slice(0, 4);

  return (
    <div className="care-float relative mx-auto w-[min(100%,280px)] md:w-[310px]">
      <div className="rounded-[48px] bg-gradient-to-b from-[#f2f2f7] to-[#d8d8de] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.12)]">
        <div className="overflow-hidden rounded-[38px] bg-white">
          <div className="flex h-9 items-center justify-center">
            <div className="h-[22px] w-[92px] rounded-full bg-[#1d1d1f]" />
          </div>
          <div className="px-5 pb-8 pt-1">
            <p className="text-[11px] font-medium text-[#0071e3]">Perto de você</p>
            <p className="mt-1 text-[22px] font-semibold tracking-tight text-[#1d1d1f]">
              Dentistas em Taubaté
            </p>
            <p className="mt-1 text-[12px] text-[#86868b]">Escolhidos com rigor</p>
            <ul className="mt-5 space-y-2.5">
              {slice.map((item, index) => (
                <li
                  key={item.id}
                  className="rounded-2xl bg-[#f5f5f7] px-3 py-3"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <p className="text-[14px] font-medium text-[#1d1d1f]">
                    {item.honorific} {item.name.split(" ")[0]}
                  </p>
                  <p className="text-[12px] text-[#86868b]">
                    {item.specialties[0]?.shortName} · {item.clinic.neighborhood}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
