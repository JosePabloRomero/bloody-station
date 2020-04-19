import React, { useRef } from "react";
import loginImg from "../../../login.svg";


const Register = ({ containerRef, onSend }) => {
  const userNameValue = useRef()
  const emailValue = useRef()
  const passwordValue = useRef()

  const handleClick = () => {
    const username = userNameValue.current.value
    const email = emailValue.current.value
    const password = passwordValue.current.value
    
    onSend({ username, email, password })
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              ref={userNameValue}
            />
          </div>
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