import Guest from "../../layouts/Guest";
import React, { useState } from "react";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import API from "../../services/api";
import Cookies from "js-cookie";
import Router from "next/router";
import { GetServerSidePropsContext } from "next";
import { useUserStore } from "../../store/user";

export default function Login() {
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function onSubmit() {
    try {
      const response = await API.post("/auth/signIn", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        setUser({
          name: response.data.info.name,
          email: response.data.email,
          gender: "",
          type: response.data.info.type,
          url: response.data.url,
        });
        Swal.fire({
          title: "Sucesso!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        Cookies.set("BeachTennis.AuthToken", response.data.token);
        setMessageType("");
        Router.push("/");
      }
    } catch (e: any) {
      setMessage(
        e.response?.data ? e.response.data.message : "Error no servidor."
      );
      setMessageType("error");
    }
  }
  return (
    <Guest>
      <div className="flex flex-col items-stretch justify-between h-screen overflow-y-hidden text-lg">
        <div className="grid w-full min-h-full grid-cols-5">
          <div className="bg-[#F7BC6D] w-full h-full hidden md:flex flex-col justify-center items-center sm:col-span-2 md:col-span-3 col-span-0">
            <div className="text-3xl font-semibold"> Bem-vindo(a)</div>
            <div className="text-2xl font-semibold text-black/40">
              Faça login para encontrar competições
            </div>
          </div>
          <div className="bg-[#6EA8F7] flex flex-col justify-center items-center p-4 space-y-5 drop-shadow-2xl sm:col-span-3 md:col-span-2 col-span-5">
            <div className="w-3/4 p-2 py-4 space-y-4 bg-white border rounded-md drop-shadow-2xl border-1">
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  className="p-1 border drop-shadow-lg border-1"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full p-4 space-y-1">
                <label className="" htmlFor="">
                  Senha
                </label>
                <input
                  type="password"
                  className="p-1 border drop-shadow-lg border-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="border border-1 drop-shadow-md rounded-2xl bg-[#F7BC6D] text-white m-4  font-semibold px-10 py-1"
                onClick={onSubmit}
                label="Entrar"
              />
              {!!messageType.length && (
                <label
                  className={`font-semibold text-white flex flex-col w-full p-4 space-y-1 ${
                    messageType === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                  htmlFor=""
                >
                  {message}
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
}
