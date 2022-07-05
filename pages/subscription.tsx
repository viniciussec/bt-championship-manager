import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Guest from "../layouts/Guest";
import API from "../services/api";

export default function Subscription() {
  const router = useRouter();

  const [athleteName, setAthleteName] = useState("");
  const [athleteEmail, setAthleteEmail] = useState("");
  const [athlete2Name, setAthlete2Name] = useState("");

  async function onSubmit() {
    try {
      const response = await API.post(
        `enrollChampionship?id=${router.query.id}`,
        {
          name: athleteName + " + " + athlete2Name,
          email: athleteEmail,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Sucesso!",
          text: "Você foi inscrito no campeonato!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        router.push("/");
      }
    } catch (e) {
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao inscrever-se no campeonato",
        icon: "error",
      });
    }
  }

  return (
    <Guest>
      <div className="bg-[#F7BC6D] min-h-screen flex flex-col items-center">
        <div className="flex justify-start w-3/4">
          <p className="mt-4 text-2xl font-medium text-white">Inscrição</p>
        </div>

        <div className="grid w-3/4 grid-cols-2 gap-4 p-4 mt-4 bg-white rounded-md">
          <div className="flex flex-col">
            <label htmlFor="">Nome do atleta</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
              onChange={(e) => setAthleteName(e.target.value)}
              value={athleteName}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Outro integrante</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
              onChange={(e) => setAthlete2Name(e.target.value)}
              value={athlete2Name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
              onChange={(e) => setAthleteEmail(e.target.value)}
              value={athleteEmail}
            />
          </div>
          <div className="flex justify-center col-span-2">
            <Button onClick={onSubmit} label="Inscrever-se" />
          </div>
        </div>
      </div>
    </Guest>
  );
}
