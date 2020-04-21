
import React, { useRef } from "react";
import loginImg from "../../../login.svg";
import fire from "../../../config/Fire";


const Login = ({ containerRef, onSend }) => {
    const emailValue = useRef()
    const passwordValue = useRef()

    const handleLogin = (user) => {
        fire.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((u) => { })
            .catch((error) => {
                console.log(error)
                validateLogin(error)
            })
    }
    const validateLogin = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                alert('El usuario aun no está registrado')
                break;
            case 'auth/invalid-email':
                alert('¡El email no es valido!')
                break;
            case 'auth/wrong-password':
                alert('La contraseña es incorrecta, ingresela nuevamente')
                break;
            default:
                break;
        }
    }
    const handleClick = () => {
        const email = emailValue.current.value
        const password = passwordValue.current.value

        handleLogin({ email, password })
    }

    return (
        <div className="base-container" ref={containerRef}>
            <div className="header">Login</div>
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
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login