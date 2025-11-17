export default function InfoStrip() {
  return (
    <div className="bg-white border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-slate-200 px-4 py-3 bg-slate-50">
            <p className="font-semibold">Domingo</p>
            <p className="text-slate-600">Culto da Sagrada Família • 19h</p>
          </div>
          <div className="rounded-xl border border-slate-200 px-4 py-3 bg-slate-50">
            <p className="font-semibold">Terça</p>
            <p className="text-slate-600">Círculo de Oração • 19h30</p>
          </div>
          <div className="rounded-xl border border-slate-200 px-4 py-3 bg-slate-50">
            <p className="font-semibold">Endereço</p>
            <p className="text-slate-600">Rua São João, 915, Irapuá I - Floriano PI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
