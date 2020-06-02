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
                                <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Agregar Personal"}
                                        subtitle={""}
                                        description={"Agrega un nuevo delegado para realizar solicitudes"}
                                        url="/Personal/AgregarPersonal"
                                        imageUrl={"https://images.unsplash.com/photo-1581360742512-021d5b2157d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Ver Personal Registrado"}
                                        subtitle={""}
                                        description={"Ver lista de personal autorizado para realizar solicitudes"}
                                        url="/Personal/ListaPersonal"
                                        imageUrl={"https://images.unsplash.com/photo-1485848395967-65dff62dc35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Editar Personal"}
                                        subtitle={""}
                                        description={"Actualiza, modifica o elimina personal registrado"}
                                        url="/Personal/EditarPersonal"
                                        imageUrl={"https://images.unsplash.com/photo-1563986768817-257bf91c5753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1385&q=80"}
                                    />
                                </Grid>
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