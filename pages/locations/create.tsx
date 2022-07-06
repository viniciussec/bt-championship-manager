import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import Guest from "../../layouts/Guest";
import API from "../../services/api";
import Swal from "sweetalert2";
import cepProm from 'cep-promise'
import { cepMask } from 'masks-br';

export default function Create() {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [numberOfCourts, setNumberOfCourts] = useState(0);

  const router = useRouter();

  const raiseCepError = (o) => {Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: o.message,
  })}

  const handleClick = event => {
    event.preventDefault();
    cepProm(cep)
  .then((o)=>{setAddress(o.street)}).catch(raiseCepError);
  };

  async function onSubmit() {

    if (!name || !cep || !address || !number) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nenhum campo pode ser vazio!',
      })
      return false;
    }

    let isNumCep = /^\d+$/.test(cep.replace('-', ''));
    let isNumAddress = /^\d+$/.test(number);
    
    if (!isNumAddress || !isNumCep) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Campos de CEP e Número devem conter apenas dígitos!',
      })
      return false;
    }

    try {const response = await API.post("/locations", {
      name,
      cep,
      address,
      number,
      numberOfCourts,
    });

    if (response.status === 201) {
      router.push("/locations");
      Swal.fire("Local criado com sucesso!", "", "success");
    }}

    catch(error:any) {
      {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      })
      return false;
    }

    }
  }

  
  return (
    
    <Guest>
      <div className="bg-[#F7BC6D] w-full min-h-screen flex flex-col items-center">
        <div className="flex justify-start w-3/4">
          <Button label="Voltar" onClick={() => router.push('/')}></Button>
        </div>
        <div className="w-3/4 p-4 mt-4 bg-white rounded-md">
          <h1 className="text-center">Cadastrar local</h1>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            action=""
          >
            <div className="flex flex-col">
              <label htmlFor="">Nome do local</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="bg-[#6EA8F7]/30 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">CEP</label>
              <input
                value={cep}
                onChange={(e) => setCep(cepMask(e.target.value))}
                type="text"
                className="bg-[#6EA8F7]/30 rounded-md p-2"
                maxLength={9}
              /> 
              <div className="w-full">
              <Button type="button" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" label="Checar CEP" 
              onClick={handleClick}></Button>
            </div>             
            </div>
            
            
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="">Logradouro</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="bg-[#6EA8F7]/30 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Número</label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                className="bg-[#6EA8F7]/30 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Número de quadras</label>
              <input
                value={numberOfCourts}
                onChange={(e) => setNumberOfCourts(parseInt(e.target.value))}
                type="number"
                className="bg-[#6EA8F7]/30 rounded-md p-2"
              />
            </div>
            <div className="flex justify-start">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                label="Cadastrar"
              ></Button>
            </div>
          </form>          
        </div>
      </div>
    </Guest>
  );
}
