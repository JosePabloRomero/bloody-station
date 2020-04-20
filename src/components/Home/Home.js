import React from 'react'
import fire from '../../config/Fire'

const App = () => {
    const logout = () => {
        fire.auth().signOut()
    }
    return (
        <div>
            <h1>Hey, you're in Home!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default App