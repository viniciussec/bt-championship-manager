import Guest from "../../layouts/Guest";
import React from "react";
import Button from "../../components/Button";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    messageType: "",
    message: "",
  };

  render() {
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
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col w-full p-4 space-y-1">
                  <label className="" htmlFor="">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="p-1 border drop-shadow-lg border-1"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <Button
                  className="border border-1 drop-shadow-md rounded-2xl bg-[#F7BC6D] text-white m-4  font-semibold px-10 py-1"
                  onClick={() => {
                    fetch("/api/auth/signIn", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
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
                  label="Entrar"
                />
                {!!this.state.messageType.length && (
                  <label
                    className={`font-semibold text-white bac flex flex-col w-full p-4 space-y-1 
                    bg-[#${
                      this.state.messageType == "error" ? "FF4F58" : "2BAE66"
                    }] 
                    `}
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
