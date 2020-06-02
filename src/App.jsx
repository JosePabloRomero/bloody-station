import React, { Component, useState, useEffect, } from "react";
import "./App.scss";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import LoginRegister from './components/LoginRegister';
import Home from './components/Home';
import fire from "./config/Fire";
import Hospitales from './components/Hospitales'
import HospitalesList from './components/Hospitales/HospitalesList.js'
import HospitalesAdd from './components/Hospitales/HospitalesAdd.js'
import Header from './components/Home/Header'
import Personal from './components/Personal'
import Dashboard from './components/Dashboard'
import PersonalList from './components/Personal/PersonalList.js'
import PersonalAdd from './components/Personal/PersonalAdd.js'
import EditarPersonal from './components/Personal/PersonalEdit.js'
import Solicitudes from './components/Solicitudes'
import ListaSolicitudes from './components/Solicitudes/ListaSolicitudes.js'
import AgregarSolicitud from './components/Solicitudes/SolicitudesAdd.js'
import SolicitudEspecifica from './components/Solicitudes/SolicitudEspecifica.js'
import HospitalEdit from './components/Hospitales/HospitalEdit.js'


class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      codigoNotificacion: 0
    });
    this.authListener = this.authListener.bind(this);
  }
  getCodigo = (codigoNotificacion) => {
    this.setState({codigoNotificacion})  
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.user ? (<Redirect to="/Home" />) : (<Redirect to="/LoginRegister" />)}
        </div>
        <Route path="/Home">
          <Header />
          <Home />
        </Route>
        <Route path="/LoginRegister">
          <LoginRegister />
        </Route>
        <Route path="/Hospitales" >
          <Header />
          <Hospitales />
        </Route>
        <Route path="/Hospitales/ListaHospitales" >
          <HospitalesList />
        </Route>
        <Route path="/Hospitales/AgregarHospital" >
          <HospitalesAdd />
        </Route>
        <Route path="/Hospitales/EditarHospitales" >
          <HospitalEdit />
        </Route>
        <Route path="/Personal" >
          <Header />
          <Personal />
        </Route>
        <Route path="/Personal/AgregarPersonal" >
          <PersonalAdd />
        </Route>
        <Route path="/Personal/ListaPersonal" >
          <PersonalList />
        </Route>
        <Route path="/Personal/EditarPersonal" >
          <EditarPersonal />
        </Route>
        <Route path="/Solicitudes" >
          <Header />
          <Solicitudes />
        </Route>
        <Route path="/Solicitudes/ListaSolicitudes" >
          <ListaSolicitudes handleCodigoNotificacion={this.getCodigo} />
        </Route>
        <Route path="/Solicitudes/AgregarSolicitud" >
          <AgregarSolicitud />
        </Route>
        <Route path='/Solicitudes/SolicitudEspecifica'>          
          <SolicitudEspecifica codigoNotificacion={this.state.codigoNotificacion} />
        </Route>
        <Route path='/Dashboard'>          
          <Dashboard />
        </Route>
      </BrowserRouter>

    )
  }
}

export default App;