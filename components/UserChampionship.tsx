import { useRouter } from "next/router";
import { Championship } from "../types/Championship";

export default function UserChampionships(props: {
  championships?: Championship[];
}) {
  const router = useRouter();
  return (
    <>
      <p className="mt-4 text-xl font-semibold">Historico de campeonatos</p>
      <div className="w-full mt-6 bg-[#6EA8F7] rounded-md">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b bg-[#6EA8F7]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-bold text-left text-white"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-bold text-left text-white"
                      >
                        Descrição
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.championships?.map((championship, index) => (
                      <tr
                        key={index}
                        onClick={() => router.push("match-list")}
                        className="bg-white border-b cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {championship.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {championship.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
