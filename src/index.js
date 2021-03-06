import React from "react";
import ReactDOM from "react-dom";
import Provider from "./Theme/Provider";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Busca from "./Pages/Busca";
import Torneio from "./Pages/Torneio";
import EncerrarTorneio from "./Pages/EncerrarTorneio";
import EncerrarPartida from "./Pages/EncerrarPartida";
import Partida from "./Pages/Partida";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import CadastroTorneio from "./Pages/CadastroTorneio";
import CadastroPartida from "./Pages/CadastroPartida";
import CadastroJogadores from "./Pages/CadastroJogadores";
import Perfil from "./Pages/Perfil";

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Busca} path="/busca" />
      <Route component={Torneio} path="/torneio" />
      <Route component={EncerrarTorneio} path="/encerrartorneio" />
      <Route component={EncerrarPartida} path="/encerrarpartida" />
      <Route component={Partida} path="/partida" />
      <Route component={Cadastro} path="/cadastro" />
      <Route component={Login} path="/login" />
      <Route component={CadastroTorneio} path="/cadastrotorneio" />
      <Route component={CadastroPartida} path="/cadastropartida" />
      <Route component={CadastroJogadores} path="/cadastrojogadores" />
      <Route component={Perfil} path="/perfil" />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
