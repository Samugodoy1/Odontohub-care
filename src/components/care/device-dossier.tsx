import type { ProfessionalCard } from "@/lib/catalog/types";

export function DeviceDossier({ dentists }: { dentists: ProfessionalCard[] }) {
  const slice = dentists.slice(0, 4);

  return (
    <div className="relative mx-auto w-[280px] md:w-[300px]">
      <div className="rounded-[44px] bg-[#1d1d1f] p-3 ring-1 ring-white/15">
        <div className="overflow-hidden rounded-[36px] bg-black">
          <div className="flex h-8 items-center justify-center">
            <div className="h-4 w-20 rounded-full bg-[#1d1d1f]" />
          </div>
          <div className="px-5 pb-8 pt-2">
            <p className="text-[11px] text-white/40">OdontoHub Care</p>
            <p className="mt-1 text-[22px] font-semibold tracking-tight text-white">
              Dentistas em Taubaté
            </p>
            <p className="mt-1 text-[12px] text-white/45">Verificados · rede OdontoHub</p>
            <ul className="mt-5 space-y-3">
              {slice.map((item) => (
                <li key={item.id} className="rounded-2xl bg-white/6 px-3 py-3">
                  <p className="text-[14px] font-medium text-white">
                    {item.honorific} {item.name.split(" ")[0]}
                  </p>
                  <p className="text-[12px] text-white/45">
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
