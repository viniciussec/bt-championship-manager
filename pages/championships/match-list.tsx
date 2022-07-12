import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";
import API from "../../services/api";
import { useUserStore } from "../../store/user";

type Participant = {
  name: string;
  wins: number;
  id: string;
  user: any;
};

export type Match = {
  id: string;
  firstParticipant: {
    email: string;
    id: string;
    name: string;
    user: any;
  };
  secondParticipant: {
    email: string;
    id: string;
    name: string;
    user: any;
  };
  firstParticipantPoints: number;
  secondParticipantPoints: number;
  name: string;
};

export default function MatchList() {
  const { user } = useUserStore();

  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [groups, setGroups] = useState<Participant[][]>([]);

  useEffect(() => {
    async function loadInfo() {
      if (router.query.id) {
        const response = await API.get(`championships?id=${router.query.id}`);
        setMatches(response.data[0].matches);

        console.log(response)

        let groups: Participant[][] = [];
        let participants: Participant[] = [];

        response.data[0].participants.forEach(
          (participant: Participant, index: number) => {
            index++;

            participants.push({
              name: participant.name,
              wins: participant.wins,
              id: participant.id,
              user: participant.user
            });

            if (index % 4 === 0) {
              groups.push(participants);
              participants = [];
            }
          }
        );

        groups.forEach((group) => group.sort((a, b) => b.wins - a.wins));

        setGroups(groups);
      }
    }
    loadInfo();
  }, [router]);

  useEffect(() => {console.log({matches})}, [matches])

  return (
    <Guest>
      <div className="bg-[#F7BC6D] min-h-screen flex flex-col items-center">
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
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-[#6EA8F7] w-full mt-4 rounded-md"
                >
                  {groups[index].map((group, index) => (
                    <div
                      key={index}
                      className={`flex justify-between p-4 text-white border-b-2 ${
                        index < 2 ? "bg-green-600" : ""
                      }`}
                    >
                      <p>{group.name}</p>
                      <p>{group.wins}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center ">
              <p className="font-semibold">Jogos</p>
              <div className=""></div>
              {matches.map((match) => (
                <div key={match.id} className="w-full">
                  <p className="mt-4 text-sm">{match.name}</p>
                  <div
                    onClick={() =>
                      user.type === "admin" &&
                      router.push("/points?id=" + match.id)
                    }
                    className="bg-[#6EA8F7] w-full mt-4 rounded-md cursor-pointer"
                  >
                    <div className={`flex justify-between p-4 text-white border-b-2 ${match.firstParticipantPoints > match.secondParticipantPoints && 'bg-green-600 rounded-t-md'}`}>
                      <p>{match.firstParticipant.name}</p>
                      {match.firstParticipant.user && <div
                        style={{
                          backgroundImage: `url("${match.firstParticipant.user.url}")`,
                         backgroundSize: "cover",
                       }}
                        className="flex items-center justify-center w-20 h-20 text-4xl font-bold text-white bg-[#6EA8F7] rounded-full"
            >
              {!match.firstParticipant.user.url && match.firstParticipant.user.name.charAt(0)}
            </div>}
                      
                      <p>{match.firstParticipantPoints}</p>
                    </div>
                    <div className={`flex justify-between p-4 text-white ${match.secondParticipantPoints > match.firstParticipantPoints && 'bg-green-600 rounded-t-md' }`}>
                      <p>{match.secondParticipant.name}</p>
                      {match.secondParticipant.user && <div
                        style={{
                          backgroundImage: `url("${match.secondParticipant.user.url}")`,
                         backgroundSize: "cover",
                       }}
                        className="flex items-center justify-center w-20 h-20 text-4xl font-bold text-white bg-[#6EA8F7] rounded-full"
            >
              {!match.secondParticipant.user.url && match.secondParticipant.user.name.charAt(0)}
            </div>}
                      <p>{match.secondParticipantPoints}</p>
                    </div>
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
