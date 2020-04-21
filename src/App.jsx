import React, { Component, useState, useEffect, } from "react";
import "./App.scss";
import LoginRegister from './components/LoginRegister';
import Home from './components/Home';
import fire from "./config/Fire";

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
      <div>{this.state.user ? (<Home />) : (<LoginRegister />)}</div>
    )
  }
}
export default App;