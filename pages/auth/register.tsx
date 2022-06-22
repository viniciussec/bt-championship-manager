import MainNav from "../../components/MainNav";
import Guest from "../../layouts/Guest";

export default function Register() {
  return (
    <Guest>
      <div className="flex flex-col items-stretch justify-between h-screen overflow-y-hidden text-lg">
        <div className="grid w-full min-h-full grid-cols-3">
          <div className="bg-[#F7BC6D] w-full h-full hidden md:flex flex-col justify-center items-center md:col-span-2">
            <div className="text-3xl font-semibold"> Bem-vindo(a)</div>
            <div className="text-2xl font-semibold text-black/40">
              Faça login para encontrar competições
            </div>
          </div>
          <div className="bg-[#6EA8F7] flex flex-col items-center p-4 space-y-3 drop-shadow-2xl md:col-span-1 col-span-3">
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                Nome completo
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                E-mail
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                Senha
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                Confirmar senha
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                Tipo de conta
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <button className="rounded-2xl bg-[#F7BC6D] text-white font-semibold px-10 py-1">
              Registrar-se
            </button>
          </div>
        </div>
      </div>
    </Guest>
  );
}
