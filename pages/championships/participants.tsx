import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";
import API from "../../services/api";

type Participant = {
  id: string;
  name: string;
  email: string;
};

export default function Participants() {
  const router = useRouter();

  const [participants, setParticipants] = useState<Participant[]>();

  useEffect(() => {
    async function loadData() {
      if (router.query.id) {
        const response = await API.get("/championships?id=" + router.query.id);

        setParticipants(response.data[0].participants);
      }
    }

    loadData();
  }, [router]);

  return (
    <Guest>
      <div className="bg-[#F7BC6D] min-h-screen flex flex-col items-center">
        <div className="w-3/4">
          <Button label="Voltar" onClick={() => router.back()} />
        </div>
        <div className="flex flex-col w-3/4 p-4 mt-4 bg-white rounded-md">
          <div className="flex justify-center text-xl font-semibold">
            <div>Participantes</div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#6EA8F7] w-1/2 mt-4 rounded-md">
              <div className="bg-[#559cff] rounded-md flex justify-between p-4 text-lg font-semibold text-white border-b-2">
                <div>Nome</div>
                <div>Email</div>
              </div>
              {participants?.map((participant) => (
                <div
                  key={participant.id}
                  className="flex justify-between p-4 text-white border-b-2"
                >
                  <div>{participant.name}</div>
                  <div>{participant.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
