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
            <div className="w-3/4 p-2 py-4 space-y-4 bg-white border rounded-md drop-shadow-2xl border-1">
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Email
                </label>
                <input type="text" className="p-1 border drop-shadow-lg border-1" />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Senha
                </label>
                <input type="text" className="p-1 border drop-shadow-lg border-1" />
              </div>
              <button className="border border-1 drop-shadow-md rounded-2xl bg-[#F7BC6D] text-white m-4  font-semibold px-10 py-1">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
