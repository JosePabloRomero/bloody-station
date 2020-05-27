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
const navigation = () => {

}

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
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
      </BrowserRouter>

    )
  }
}

export default App;