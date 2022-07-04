import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Guest from "../layouts/Guest";
import { Location } from "../types/Location";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/locations");
  const data = await res.json();

  return { props: { locations: data } };
};

export default function LocationsList({ locations }: { locations: Location[] }) {
  const router = useRouter();
  return (
    <Guest>
      <div className="bg-[#F7BC6D] w-full h-screen flex flex-col items-center">
        <div className="w-3/4">
          <Button onClick={() => router.back()} label="Voltar" />
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
