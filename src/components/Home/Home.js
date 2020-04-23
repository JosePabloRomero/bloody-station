import React from 'react'
import fire from '../../config/Fire'
import { Button, Grid } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Header from './Header'
import Content from './Content'
import theme from './theme.js'

const useStyles = makeStyles(() => ({
    mainGrid: {
        
        color: '#FFF'
    }
}))

const App = () => {
    const classes = useStyles()
    const logout = () => {
        fire.auth().signOut()
    }
    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Header logOutClick={logout}/>
                </Grid>
                <ThemeProvider theme={theme}>
                    <Grid item container style={{paddingTop:'100px'}}>
                        <Grid item xs={0} sm={2} />
                        <Grid item xs={12} sm={8} className={classes.mainGrid}>
                            <Content />
                        </Grid>
                        <Grid item xs={0} sm={2} />
                    </Grid>
                </ThemeProvider>
            </Grid>
            {/* <h1>Hey, you're in Home!</h1>
            <button onClick={logout}>Logout</button> */}
        </div>
    )
}

export default App