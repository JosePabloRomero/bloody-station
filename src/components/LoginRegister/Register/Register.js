import React, { useRef } from "react";
import loginImg from "../../../login.svg";
import fire from "../../../config/Fire";


const Register = ({ containerRef, onSend }) => {
  const emailValue = useRef()
  const passwordValue = useRef()

  const handleRegister = (user) => {
    fire.auth().createUserWithEmailAndPassword(user.email, user.password)
      .catch((error) => {
        console.log(error)
        validateRegister(error)
      })
  }
  const validateRegister = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        alert('¡El email no es valido!')
        break;
      case 'auth/weak-password':
        alert('La contraseña es demasiado corta')
        break;
      default:
        break;
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    const email = emailValue.current.value
    const password = passwordValue.current.value
    handleRegister({ email, password })

  }
  return (
    <div className="base-container" ref={containerRef}>
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              ref={emailValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              ref={passwordValue}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleClick}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Register