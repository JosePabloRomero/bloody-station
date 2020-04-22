import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

/* const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
})) */

const Content = () => {
    return (
        <ThemeProvider theme={theme}>
            <Paper square>
                <Grid container>
                    <Typography variant='h1'>
                        Bloody Station HomePage
                    </Typography>
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}

export default Content