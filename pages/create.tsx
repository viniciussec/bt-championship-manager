import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Guest from "../layouts/Guest";
import API from "../services/api";

export default function Index() {
  const [locations, setLocations] = useState<{ id: string; name: string }[]>(
    []
  );

  const router = useRouter();

  useEffect(() => {
    async function loadLocations() {
      const response = await API.get("/locations");
      setLocations(response.data);
    }
    loadLocations();
  });

  return (
    <div>
      <Guest>
        <div className="bg-[#F7BC6D] w-full h-screen flex flex-col items-center">
          <div className="w-3/4 mt-2">
            <div className="w-full">
              <Button label="Voltar" onClick={() => router.back()}></Button>
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
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
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
