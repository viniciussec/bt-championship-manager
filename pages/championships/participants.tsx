import { useRouter } from "next/router";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";

export default function Participants() {
  const router = useRouter();

  return (
    <Guest>
      <div className="bg-[#F7BC6D] min-h-screen flex flex-col items-center">
        <div className="w-3/4">
          <Button label="Voltar" onClick={() => router.back()} />
        </div>
        <div className="flex flex-col w-3/4 p-4 mt-4 bg-white rounded-md">
          <div className="flex justify-center text-xl font-semibold">
            <p>Participantes</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#6EA8F7] w-1/2 mt-4 rounded-md">
              <div className="bg-[#559cff] rounded-md flex justify-between p-4 text-lg font-semibold text-white border-b-2">
                <p>Nome</p>
                <p>Vitórias</p>
              </div>
              <div className="flex justify-between p-4 text-white border-b-2">
                <p>João da Silva</p>
                <p>6</p>
              </div>
              <div className="flex justify-between p-4 text-white border-b-2">
                <p>Pedro dos Santos</p>
                <p>1</p>
              </div>
              <div className="flex justify-between p-4 text-white border-b-2">
                <p>Thor 4</p>
                <p>1</p>
              </div>
              <div className="flex justify-between p-4 text-white">
                <p>Elias</p>
                <p>1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
