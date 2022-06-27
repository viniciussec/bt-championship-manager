import Head from "next/head";
import { useRouter } from "next/router";
import Guest from "../layouts/Guest";

export default function Index() {
  const router = useRouter();
  
  return (
    <div>
      <Guest>
        <div className="bg-[#F7BC6D] w-full h-screen flex flex-col items-center">
          <div className="w-3/4 mt-2">
            <div className="w-full">
              <button
                onClick={() => router.back()}
                className="mt-4 bg-[#6EA8F7] text-white px-4 py-2 rounded-md font-medium"
              >
                Voltar
              </button>
            </div>
          </div>
          <div className="w-3/4 p-4 mt-4 bg-white rounded-md">
            <form action="">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col ">
                  <label htmlFor="">Nome do campeonato</label>
                  <input
                    type="text"
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Duração</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Início"
                      type="text"
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                    <input
                      placeholder="Fim"
                      type="text"
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Local</label>
                  <select className="bg-[#6EA8F7]/30 rounded-md p-2">
                    <option value="ce">Arena original CE</option>
                    <option value="ce">Arena 2</option>
                    <option value="ce">Arena 3</option>
                  </select>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Formato</label>
                  <select className="bg-[#6EA8F7]/30 rounded-md p-2">
                    <option value="ce">Fase de grupos</option>
                    <option value="ce">Eliminatórias</option>
                  </select>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Prazo de inscrições</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Início"
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                    <input
                      placeholder="Fim"
                      type="text"
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Número de quadras utilizadas</label>
                  <input
                    type="number"
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Máximo de participantes</label>
                  <input
                    type="number"
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Dupla ou individual</label>
                  <select className="bg-[#6EA8F7]/30 rounded-md p-2">
                    <option value="ce">Dupla</option>
                    <option value="ce">Individual</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="">Descrição</label>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Guest>
    </div>
  );
}
