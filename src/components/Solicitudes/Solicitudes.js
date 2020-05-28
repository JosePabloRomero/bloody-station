import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from '../Home/theme'
import SelectCard from '../Home/SelectCard'

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
                    <Grid item container>
                        <Grid item xs={0} sm={2} />
                        <Grid item xs={12} sm={8} className={classes.mainGrid}>
                            <Grid container spacing={2} style={{ paddingTop: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                    <SelectCard
                                        title={"Crear una solicitud"}
                                        subtitle={""}
                                        description={"Envia una notificación con una solicitud de sangre para todos los usuarios"}
                                        url="/Solicitudes/AgregarSolicitud"
                                        imageUrl={"https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCard
                                        title={"Ver lista de solicitudes"}
                                        subtitle={""}
                                        description={"Ver listado con las solicitudes de sangre realziadas"}
                                        url="/Solicitudes/ListaSolicitudes"
                                        imageUrl={"https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Editar una solicitud"}
                                        subtitle={""}
                                        description={"Actualiza, modifica o elimina solicitudes registradas"}
                                        url="/Solicitudes/EditarSolicitud"
                                        imageUrl={"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}
                                    />
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={0} sm={2} />
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )

}

export default App