import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";
import API from "../../services/api";

export type Match = {
  id: string;
  firstParticipant: {
    email: string;
    id: string;
    name: string;
  };
  secondParticipant: {
    email: string;
    id: string;
    name: string;
  };
  firstParticipantPoints: number;
  secondParticipantPoints: number;
};

export default function MatchList() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function loadInfo() {
      if (router.query.id) {
        const response = await API.get(`championships?id=${router.query.id}`);
        setMatches(response.data[0].matches);
      }
    }
    loadInfo();
  }, [router]);

  return (
    <Guest>
      <div className="bg-[#F7BC6D] h-screen flex flex-col items-center">
        <div className="w-3/4">
          <Button label="Voltar" onClick={() => router.push("/")} />
          <Button
            className="ml-4"
            label="Participantes"
            onClick={() =>
              router.push("/championships/participants?id=" + router.query.id)
            }
          />
        </div>
        <div className="flex flex-col justify-center w-3/4 p-4 mt-4 bg-white rounded-md">
          <p className="text-lg font-semibold text-center">Fase de grupos</p>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col items-center ">
              <p className="font-semibold">Tabela</p>
              <p className="mt-4">Grupo A</p>
              <div className="bg-[#6EA8F7] w-full mt-4 rounded-md">
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 1</p>
                  <p>6</p>
                </div>
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
                <div className="flex justify-between p-4 text-white">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
              </div>
              <p className="mt-4">Grupo B</p>
              <div className="bg-[#6EA8F7] w-full mt-4 rounded-md">
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 1</p>
                  <p>6</p>
                </div>
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
                <div className="flex justify-between p-4 text-white border-b-2">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
                <div className="flex justify-between p-4 text-white">
                  <p>Equipe 2</p>
                  <p>1</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <p className="font-semibold">Jogos</p>
              <div className="mt-10"></div>
              {matches.map((match) => (
                <div
                  onClick={() => router.push("/points?id=" + match.id)}
                  key={match.id}
                  className="bg-[#6EA8F7] w-full mt-4 rounded-md cursor-pointer"
                >
                  <div className="flex justify-between p-4 text-white border-b-2">
                    <p>{match.firstParticipant.name}</p>
                    <p>{match.firstParticipantPoints}</p>
                  </div>
                  <div className="flex justify-between p-4 text-white">
                    <p>{match.firstParticipant.name}</p>
                    <p>{match.secondParticipantPoints}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
