import React, { useState } from "react";
import Guest from "../../layouts/Guest";
// import { useRouter } from "next/router";
import PasswordStrengthBar from "react-password-strength-bar";
import API from "../../services/api";
import Button from "../../components/Button";
import Swal from "sweetalert2";

export default  function Register(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("spectator");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userImageProfile, setUserImageProfile] = useState();

  async function onSubmit() {
    if (confirmPassword != password) {
      setMessage("Senhas não coincidem!");
      setMessageType("error");
      return;
    }
    try {
      const response = await API.post("/auth/register", {
        username, password, email, type, gender: ""
      });

      const {id} = response.data;
      console.log(id);

      let formData = new FormData();
      formData.append('image',userImageProfile)

      const responseImage = await API.post(`/upload?id=${id}`, userImageProfile, {headers: {"Content-Type": "image/png"}})
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: "Sucesso!",
          text: "Você foi cadastrado com sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setMessageType("");
    } catch (e) {
      setMessage("Error no servidor.");
      setMessageType("error");
    }
  };
  return (
    <Guest>
      <div className="flex flex-col items-stretch justify-between h-screen overflow-y-hidden text-lg">
        <div className="grid w-full min-h-full grid-cols-5">
          <div className="bg-[#F7BC6D] w-full h-full hidden md:flex flex-col justify-center items-center sm:col-span-2 md:col-span-3">
            <div className="text-3xl font-semibold"> Bem-vindo(a)</div>
            <div className="text-2xl font-semibold text-black/40">
              Faça login para encontrar competições
            </div>
          </div>
          <div className="bg-[#6EA8F7] flex flex-col justify-center items-center p-4 space-y-3 drop-shadow-2xl sm:col-span-3 md:col-span-2 col-span-5">
            <div className="w-3/4 p-2 py-4 space-y-4 bg-white border rounded-md drop-shadow-2xl border-1">
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Nome completo
                </label>
                <input
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  type="text"
                  className="p-1 border drop-shadow-lg border-1"
                />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  E-mail
                </label>
                <input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  className="p-1 border drop-shadow-lg border-1"
                />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Senha
                </label>
                <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  className="p-1 border drop-shadow-lg border-1"
                />
                <PasswordStrengthBar
                  password={password}
                  scoreWords={[
                    "Muito fraca",
                    "Fraca",
                    "Normal",
                    "Forte",
                    "Muito forte",
                  ]}
                  scoreWordStyle={{
                    color: "black",
                    display: password ? "block" : "none",
                  }}
                  shortScoreWord="Muito curta"
                  minLength={6}
                  barColors={[
                    "#ddd",
                    "#ef4836",
                    "#f6b44d",
                    "#2b90ef",
                    "#0f0",
                  ]}
                />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-1 border drop-shadow-lg border-1"
                />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Tipo de conta
                </label>
                <select
                  className="p-1 border drop-shadow-lg border-1"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="admin">Administrador</option>
                  <option value="athlete">Atleta</option>
                  <option value="spectator">Espectador</option>
                </select>
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Foto
                </label>
                <input
                  onChange={(e)=>setUserImageProfile(e.target.files[0])}
                  type="file"
                  className="p-1 border drop-shadow-lg border-1"
                />
              </div>
              <Button
                onClick={onSubmit}
                label="Registrar"
                className="border border-1 m-4 rounded-2xl bg-[#F7BC6D] text-white font-semibold px-10 py-1"
              />
              {!!messageType.length && (
                <label
                  className={`font-semibold text-white flex flex-col w-full p-4 space-y-1 ${
                    messageType === "error"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                  htmlFor=""
                >{message}</label>
              )}
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
