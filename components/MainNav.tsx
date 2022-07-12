import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/user";
import Button from "./Button";
import Swal from "sweetalert2";

export default function MainNav() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  function logOut() {
    localStorage.removeItem("BeachTennis.AuthToken");
    setUser({
      name: "",
      email: "",
      type: "",
      gender: "",
      url: "",
    });
    Swal.fire("Logout executado com sucesso!", "", "success");
    router.push("/");
  }

  return (
    <div className="flex justify-between p-3 bg-white drop-shadow-xl">
      <div onClick={() => router.push("/")}>
        <Image
          className="cursor-pointer"
          alt="Logo"
          height="40"
          width="40"
          src="/logo_bt.png"
        />
      </div>
      {user.type ? (
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center">
            <p>
              Olá,{" "}
              <b
                onClick={() => router.push("/user-profile")}
                className="cursor-pointer"
              >
                {user.name}{" "}
              </b>
            </p>
          </div>
          <button
            onClick={() => logOut()}
            className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="flex justify-between space-x-4">
          <Link href="/auth/register">
            <button className="font-medium">Registre-se</button>
          </Link>
          <Link href="/auth/login">
            <button className="text-white bg-[#6EA8F7] rounded-md px-2 py-1 font-medium">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
