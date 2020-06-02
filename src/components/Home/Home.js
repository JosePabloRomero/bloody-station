import React from 'react'
import {Grid } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Content from './Content'
import theme from './theme.js'

const useStyles = makeStyles(() => ({
    mainGrid: {        
        color: '#FFF'
    }
}))

const App = () => {
    const classes = useStyles()
    return (
        <div>
            <Grid container direction="column">                                        
                <ThemeProvider theme={theme}>
                    <Grid item container style={{paddingTop:'100px'}}>
                        <Grid item xs={0} sm={1} />
                        <Grid item xs={12} sm={10} className={classes.mainGrid}>
                            <Content />
                        </Grid>
                        <Grid item xs={0} sm={1} />
                    </Grid>
                </ThemeProvider>
            </Grid>
            {/* <h1>Hey, you're in Home!</h1>
            <button onClick={logout}>Logout</button> */}
        </div>
    )
}

export default App