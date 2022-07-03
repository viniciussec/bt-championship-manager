import Button from "../components/Button";
import Guest from "../layouts/Guest";

export default function Subscription() {
  return (
    <Guest>
      <div className="bg-[#F7BC6D] h-screen flex flex-col items-center">
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Outro integrante</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">E-mail do segundo integrante</label>
            <input
              type="text"
              placeholder="Início"
              className="bg-[#6EA8F7]/30 rounded-md p-2"
            />
          </div>
          <div className="flex justify-center col-span-2">
            <Button label="Inscrever-se" />
          </div>
        </div>
      </div>
    </Guest>
  );
}
