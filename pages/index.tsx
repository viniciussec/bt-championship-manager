import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Guest from "../layouts/Guest";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/pt";
import { Championship } from "../types/Championship";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/championships");
  const data = await res.json();

  return { props: { championships: data } };
};

export default function Index({
  championships,
}: {
  championships: Championship[];
}) {
  const router = useRouter();
  moment.locale("pt");
  return (
    <div>
      <Head>
        <title>Gestor de campeonatos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Guest>
        <div className="bg-[#F7BC6D] w-full min-h-screen flex flex-col items-center">
          <div className="flex w-3/4">
            <Button
              onClick={() => router.push("championships/create")}
              label="Novo campeonato"
            />
            <Button
              className="ml-4"
              onClick={() => router.push("locations/create")}
              label="Novo local"
            />
            <Button
              className="ml-4"
              onClick={() => router.push("locations")}
              label="Lista de locais"
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
                            Descrição
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
                            Início do Campeonato
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Término do Campeonato
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Ações
                          </th>
                        </tr>
                      </thead>
                      {championships &&
                        championships.map((champ) => (
                          <tbody key={champ.id}>
                            <tr
                              onClick={() => router.push(`championships/match-list`)}
                              className="bg-white border-b cursor-pointer"
                            >
                              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                {champ.name}
                              </td>
                              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                {champ.description}
                              </td>
                              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                {champ.location.name}
                              </td>
                              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                {moment(champ.startDate).format("LLL")}
                              </td>
                              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                {moment(champ.endDate).format("LLL")}
                              </td>
                              <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                <Button
                                  onClick={() =>
                                    router.push(
                                      `championships/edit?id=${champ.id}`
                                    )
                                  }
                                  label="Editar"
                                ></Button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
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
