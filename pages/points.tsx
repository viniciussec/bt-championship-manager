import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Guest from "../layouts/Guest";
import API from "../services/api";
import { Match } from "./championships/match-list";

export default function Index() {
  const router = useRouter();

  const [firstParticipantPoints, setFirstParticipantPoints] = useState("");
  const [secondParticipantPoints, setSecondParticipantPoints] = useState("");
  const [matchData, setMatchData] = useState<Match>();

  useEffect(() => {
    async function loadData() {
      if (router.query.id) {
        const response = await API.get(`matches?id=${router.query.id}`);
        setMatchData(response.data);
        setFirstParticipantPoints(response.data.firstParticipantPoints);
        setSecondParticipantPoints(response.data.secondParticipantPoints);
      }
    }
    loadData();
  }, [router]);

  async function onSubmit() {
    try {
      const response = await API.patch("matches?id=" + router.query.id, {
        firstParticipantPoints,
        secondParticipantPoints,
      });

      if (response.status === 204) {
        Swal.fire({
          title: "Sucesso",
          text: "Pontos atualizados com sucesso",
          icon: "success",
          confirmButtonText: "Ok",
        });
        router.back();
      }
    } catch (e) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao atualizar os pontos",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div>
      <Guest>
        <div className="bg-[#F7BC6D] w-full min-h-screen flex flex-col items-center">
          <div className="flex flex-col w-3/4 p-4 mt-4 bg-white rounded-md">
            <p className="text-xl font-medium">Gerenciar pontos</p>
            <div className="flex flex-col items-center justify-center">
              <p className="font-medium">Partida</p>
              <div className="flex justify-between w-2/3">
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="number"
                    className="h-40 w-40 bg-[#6EA8F7]/30 rounded-md text-2xl text-center"
                    placeholder="0"
                    value={firstParticipantPoints}
                    onChange={(e) => setFirstParticipantPoints(e.target.value)}
                  />
                  <label className="mt-2" htmlFor="">
                    {matchData?.firstParticipant.name || "Equipe 1"}
                  </label>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="number"
                    className="h-40 w-40 bg-[#6EA8F7]/30 rounded-md text-2xl text-center"
                    placeholder="0"
                    value={secondParticipantPoints}
                    onChange={(e) => setSecondParticipantPoints(e.target.value)}
                  />
                  <label className="mt-2" htmlFor="">
                    {matchData?.secondParticipant.name || "Equipe 2"}
                  </label>
                </div>
              </div>
              <Button onClick={() => onSubmit()} label="Submeter set" />
            </div>
          </div>
        </div>
      </Guest>
    </div>
  );
}
