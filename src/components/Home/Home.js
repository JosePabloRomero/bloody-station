import React from 'react'
import fire from '../../config/Fire'
import {Button, Grid} from '@material-ui/core'
import Header from './Header'
import Content from './Content'
const App = () => {
    const logout = () => {
        fire.auth().signOut()
    }
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2} />
                        <Grid item xs={12} sm={8}>
                            <Content/>
                        </Grid>
                    <Grid item xs={0} sm={2} />
                </Grid>
            </Grid>
            {/* <h1>Hey, you're in Home!</h1>
            <button onClick={logout}>Logout</button> */}
        </div>
    )
}

export default App