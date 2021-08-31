import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Theme/Provider';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Jogo from './Pages/Jogo';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import CadastroTorneio from './Pages/CadastroTorneio';
import CadastroJogadores from './Pages/CadastroJogadores';

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={Jogo} path='/jogo' />
      <Route component={Cadastro} path='/cadastro' />
      <Route component={Login} path='/login' />
      <Route component={Admin} path='/admin' />
      <Route component={CadastroTorneio} path='/cadastrotorneio' />
      <Route component={CadastroJogadores} path='/cadastrojogadores' />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
