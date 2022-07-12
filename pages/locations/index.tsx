import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import API from "../../services/api";
import { useUserStore } from "../../store/user";
import dynamic from "next/dynamic";
const Guest = dynamic(() => import("../../layouts/Guest"), { ssr: false }); //<- set SSr to false
import { Location } from "../../types/Location";

export default function LocationsList() {
  const router = useRouter();
  const { user } = useUserStore();

  const [locations, setLocations] = useState<Location[]>([]);

  async function deleteLocation(id: string) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá desfazer isso! Todos os campeonatos alocados neste local serão excluídos também!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await API.delete("/locations?id=" + id);
        console.log(response);

        if (response.status == 204) {
          Swal.fire("Excluído!", "A localização foi excluída", "success").then(
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

  useEffect(() => {
    async function loadData() {
      const res = await API.get("locations");

      setLocations(res.data);
    }
    loadData();
  }, []);

  return (
    <Guest>
      <div className="bg-[#F7BC6D] w-full min-h-screen flex flex-col items-center">
        <div className="w-3/4">
          <Button onClick={() => router.push("/")} label="Voltar" />
          {user.type === "admin" && (
            <Button
              className="ml-4"
              onClick={() => router.push("locations/create")}
              label="Novo local"
            />
          )}
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
                          CEP
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-bold text-left text-white"
                        >
                          Endereço
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-bold text-left text-white"
                        >
                          Número
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-bold text-left text-white"
                        >
                          Número de Quadras
                        </th>
                        {user.type === "admin" && (
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-bold text-left text-white"
                          >
                            Ações
                          </th>
                        )}
                      </tr>
                    </thead>

                    {locations.map((location) => (
                      <tbody key={location.id}>
                        <tr className="bg-white border-b cursor-pointer">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {location.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {location.cep}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {location.address}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {location.number}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {location.numberOfCourts}
                          </td>
                          {user.type === "admin" && (
                            <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                              <Button
                                label="Editar"
                                color="bg-yellow-500 hover:bg-yellow-600"
                                onClick={() =>
                                  router.push(
                                    "locations/edit?id=" + location.id
                                  )
                                }
                              />
                              <Button
                                className="ml-4"
                                label="Excluir"
                                color="bg-red-500 hover:bg-red-700"
                                onClick={() => deleteLocation(location.id)}
                              ></Button>
                            </td>
                          )}
                        </tr>{" "}
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
  );
}
