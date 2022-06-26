import MainNav from "../../components/MainNav";
import Guest from "../../layouts/Guest";

export default function Login() {
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
          <div className="bg-[#6EA8F7] flex flex-col justify-center items-center p-4 space-y-5 drop-shadow-2xl md:col-span-1 col-span-3">
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white" htmlFor="">
                Email
              </label>
              <input type="text" className="p-1 drop-shadow-lg" />
            </div>
            <div className="flex flex-col w-full p-4 space-y-1">
              <label className="font-semibold text-white " htmlFor="">
                Senha
              </label>
              <input type="password" className="p-1 drop-shadow-lg" />
            </div>
            <button className="rounded-2xl bg-[#F7BC6D] text-white font-semibold px-10 py-1">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </Guest>
  );
}
