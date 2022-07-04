import { useRouter } from "next/router";

export default function UserChampionships() {
    const router = useRouter();
    return (<>
        <p className="font-semibold">Historico de campeonatos</p>
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
                                            resultado
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
                                            Vitoria
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}