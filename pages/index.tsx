import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/pt";
import { Championship } from "../types/Championship";
import { Location } from "../types/Location";
import Swal from "sweetalert2";
import { useUserStore } from "../store/user";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import API from "../services/api";
const Guest = dynamic(() => import("../layouts/Guest"), { ssr: false }); //<- set SSr to false

export default function Index() {
  const { user } = useUserStore();
  const router = useRouter();
  moment.locale("pt");

  const [championships, setChampionships] = useState<Championship[]>();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function loadData() {
      const championshipsRes = await API.get("championships");
      const locationsRes = await API.get("locations");

      setChampionships(championshipsRes.data);
      setLocations(locationsRes.data);
    }
    loadData();
  }, []);

  async function deleteChampionship(id: string) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá desfazer isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await API.delete("/championships?id=" + id);
        console.log(response);

        if (response.status == 204) {
          Swal.fire("Excluído!", "O Campeonato foi excluída", "success").then(
            (result) => {
              if (result.isConfirmed) {
                router.reload();
              }
            }
          );
        }
      }
    });
  }

  return (
    <div>
      <Head>
        <title>Gestor de campeonatos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Guest>
        <div
          // style={{
          //   backgroundImage:
          //     'URL("https://blog.boladetenisdelivery.com/wp-content/uploads/2021/12/beach-tennis-scaled.jpg")',
          // }}
          className="absolute w-screen h-screen -z-10 blur-sm bg-[#F7BC6D]"
        ></div>
        <div className="flex flex-col items-center w-full min-h-screen">
          <div className="flex w-3/4">
            {user.type === "admin" && (
              <Button
                onClick={() =>
                  locations?.length > 0
                    ? router.push("championships/create")
                    : Swal.fire({
                        title: "Nenhum local foi criado ainda!",
                        text: "Deseja criar um novo local?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Criar novo local",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          router.push("locations/create");
                        }
                      })
                }
                label="Novo campeonato"
              />
            )}
            {user.type === "admin" && (
              <Button
                className="ml-4"
                onClick={() => router.push("locations/create")}
                label="Novo local"
              />
            )}
            <Button
              className={user.type === "admin" ? "ml-4" : ""}
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
                            <tr className="bg-white border-b cursor-pointer">
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
                              {user.type === "admin" && (
                                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                  <Button
                                    onClick={() =>
                                      router.push(
                                        `championships/edit?id=${champ.id}`
                                      )
                                    }
                                    color="bg-yellow-500 hover:bg-yellow-600"
                                    label="Editar"
                                  ></Button>
                                  <Button
                                    className="ml-1"
                                    onClick={() =>
                                      router.push(
                                        `championships/match-list?id=${champ.id}`
                                      )
                                    }
                                    label="Abrir"
                                  ></Button>
                                  <Button
                                    className="ml-1"
                                    color="bg-red-600 hover:bg-red-700"
                                    onClick={() => deleteChampionship(champ.id)}
                                    label="Excluir"
                                  ></Button>
                                </td>
                              )}
                              {user.type !== "admin" && (
                                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                  <Button
                                    color="bg-green-600 hover:bg-green-700"
                                    onClick={() =>
                                      router.push(`subscription?id=${champ.id}`)
                                    }
                                    label="Inscrever"
                                  ></Button>
                                  <Button
                                    className="ml-1"
                                    onClick={() =>
                                      router.push(
                                        `championships/match-list?id=${champ.id}`
                                      )
                                    }
                                    label="Abrir"
                                  ></Button>
                                </td>
                              )}
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
