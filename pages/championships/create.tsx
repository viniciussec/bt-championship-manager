import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";
import API from "../../services/api";

export default function Index() {
  const router = useRouter();
  const [locations, setLocations] = useState<{ id: string; name: string }[]>(
    []
  );

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>();
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [enrollStartDate, setEnrollStartDate] = useState("");
  const [numberOfCourts, setNumberOfCourts] = useState<string>('');
  const [enrollEndDate, setEnrollEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function loadLocations() {
      const response = await API.get("/locations");
      setLocations(response.data);
      setLocationId(response.data[0].id);
    }
    loadLocations();
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();


    if (!name || !numberOfParticipants || !startDate || !endDate || !enrollEndDate || !enrollStartDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nenhum campo pode ser vazio!',
      })
      return false;
    }

    if (Date.parse(startDate)>Date.parse(endDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A data de início do Campeonato deve ser anterior à data de término!',
      })
      return false;
    }

    if (Date.parse(enrollStartDate)>Date.parse(enrollEndDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A data de início das inscrições deve ser anterior à data de término!',
      })
      return false;
    }


    try {const response = await API.post("/championships", {
      category,
      name,
      numberOfParticipants,
      description,
      locationId,
      enrollStartDate,
      enrollEndDate,
      startDate,
      endDate,
    });

    if (response.status === 201) {
      router.push("/");
      Swal.fire("Campeonato criado com sucesso!", "", "success");
    }}

    catch(error:any){
       {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      })
      return false;
    }
  }
    
    
  }

  return (
    <div>
      <Guest>
        <div className="bg-[#F7BC6D] w-full min-h-screen flex flex-col items-center">
          <div className="w-3/4 mt-2">
            <div className="w-full">
              <Button label="Voltar" onClick={() => router.push('/')}></Button>
            </div>
          </div>
          <div className="w-3/4 p-4 mt-4 bg-white rounded-md">
            <form action="">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col ">
                  <label htmlFor="">Nome do campeonato</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Duração</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Início"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                    <input
                      placeholder="Fim"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Local</label>
                  <select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  >
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
                    {/* <option value="ce">Eliminatórias</option> */}
                  </select>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Prazo de inscrições</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={enrollStartDate}
                      onChange={(e) => setEnrollStartDate(e.target.value)}
                      placeholder="Início"
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                    <input
                      placeholder="Fim"
                      type="date"
                      value={enrollEndDate}
                      onChange={(e) => setEnrollEndDate(e.target.value)}
                      className="bg-[#6EA8F7]/30 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Número de quadras utilizadas</label>
                  <input
                    type="number"
                    value={numberOfCourts}
                    onChange={(e) => setNumberOfCourts(e.target.value)}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Máximo de participantes</label>
                  <input
                    type="number"
                    value={numberOfParticipants}
                    onChange={(e) =>
                      setNumberOfParticipants(Number(e.target.value))
                    }
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Dupla ou individual</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  >
                    <option value="ce">Dupla</option>
                    <option value="ce">Individual</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="">Descrição</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    className="bg-[#6EA8F7]/30 rounded-md p-2"
                  ></textarea>
                </div>
                <div className="w-full">
                  <Button label="Cadastrar" onClick={onSubmit} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Guest>
    </div>
  );
}
