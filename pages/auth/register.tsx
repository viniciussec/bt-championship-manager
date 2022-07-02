import MainNav from "../../components/MainNav";
import React from "react";
import Guest from "../../layouts/Guest";
import { useRouter } from "next/router";
import PasswordStrengthBar from "react-password-strength-bar";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "spectator",
    messageType: "",
    message: "",
  };

  render() {
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
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    type="text"
                    className="p-1 border drop-shadow-lg border-1"
                  />
                </div>
                <div className="flex flex-col w-full p-4 space-y-1">
                  <label className="" htmlFor="">
                    E-mail
                  </label>
                  <input
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    type="email"
                    className="p-1 border drop-shadow-lg border-1"
                  />
                </div>
                <div className="flex flex-col w-full p-4 space-y-1">
                  <label className="" htmlFor="">
                    Senha
                  </label>
                  <input
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    type="password"
                    className="p-1 border drop-shadow-lg border-1"
                  />
                  <PasswordStrengthBar
                    password={this.state.password}
                    scoreWords={[
                      "Muito fraca",
                      "Fraca",
                      "Normal",
                      "Forte",
                      "Muito forte",
                    ]}
                    scoreWordStyle={{
                      color: "black",
                      display: this.state.password ? "block" : "none",
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
                    value={this.state.confirmPassword}
                    onChange={(e) =>
                      this.setState({ confirmPassword: e.target.value })
                    }
                    className="p-1 border drop-shadow-lg border-1"
                  />
                </div>
                <div className="flex flex-col w-full p-4 space-y-1">
                  <label className="" htmlFor="">
                    Tipo de conta
                  </label>
                  <select
                    className="p-1 border drop-shadow-lg border-1"
                    value={this.state.accountType}
                    onChange={(e) =>
                      this.setState({ accountType: e.target.value })
                    }>
                    <option value="admin">Administrador</option>
                    <option value="athlete">Atleta</option>
                    <option value="spectator">Espectador</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (this.state.confirmPassword != this.state.password) {
                      this.setState({
                        message: "As senhas não coincidem!",
                        messageType: "error",
                      });
                      console.log(this.state.confirmPassword);
                      console.log(this.state.password);
                      return;
                    }
                    fetch("/api/auth/register", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        gender: "",
                        email: this.state.email,
                        type: this.state.accountType,
                      }),
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then((jsonResponse) => {
                        if (jsonResponse.success) {
                          this.setState({
                            message: jsonResponse.message,
                            messageType: "success",
                          });
                        } else {
                          this.setState({
                            message: jsonResponse.message,
                            messageType: "error",
                          });
                        }
                      })
                      .catch((error) => {
                        this.setState({
                          message: "Erro no servidor.",
                          messageType: "error",
                        });
                      });
                  }}
                  className="border border-1 m-4 rounded-2xl bg-[#F7BC6D] text-white font-semibold px-10 py-1"
                >
                  Registrar-se
                </button>
                {this.state.messageType == "success" && (
                  <label
                    className="font-semibold text-white bac bg-[#2BAE66] flex flex-col w-full p-4 space-y-1"
                    htmlFor=""
                  >
                    {this.state.message}
                  </label>
                )}
                {this.state.messageType == "error" && (
                  <label
                    className="font-semibold text-white bac bg-[#FF4F58] flex flex-col w-full p-4 space-y-1"
                    htmlFor=""
                  >
                    {this.state.message}
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </Guest>
    );
  }
}

export default Register;
