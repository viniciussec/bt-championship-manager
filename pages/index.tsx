import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Guest from "../layouts/Guest";

export default function Index() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Gestor de campeonatos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Guest>
        <div className="bg-[#F7BC6D] w-full h-screen flex flex-col items-center">
          <div className="flex w-3/4">
            <Button
              onClick={() => router.push("create")}
              label="Novo campeonato"
            />
            <Button
             className="ml-4"
              onClick={() => router.push("locations/create")}
              label="Novo local"
            />
          </div>
          <div className="w-3/4 mt-6 bg-[#6EA8F7] rounded-md">
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
                            Local
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Início do campeonato
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Duração
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          onClick={() => router.push("match-list")}
                          className="bg-white border-b cursor-pointer"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            Campeonato municipal
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Arena CE
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            30/05/2022
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            1 dia
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Inscrições Abertas
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            Campeonato municipal
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Arena CE
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            30/05/2022
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            1 dia
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Inscrições Abertas
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            Campeonato municipal
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Arena CE
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            30/05/2022
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            1 dia
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Inscrições Abertas
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            Campeonato municipal
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Arena CE
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            30/05/2022
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            1 dia
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            Inscrições Abertas
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Guest>
    </div>
  );
}
