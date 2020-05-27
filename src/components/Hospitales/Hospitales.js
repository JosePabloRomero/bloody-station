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
                                        title={"Agregar Hospitales"}
                                        subtitle={""}
                                        description={"Agrega un nuevo hospital a la base de datos"}
                                        url="/Hospitales/AgregarHospital"
                                        imageUrl={"https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Ver lista de Hospitales"}
                                        subtitle={""}
                                        description={"Ver listado de los hospitales registrados"}
                                        url="/Hospitales/ListaHospitales"
                                        imageUrl={"https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <SelectCard
                                        title={"Editar Hospitales"}
                                        subtitle={""}
                                        description={"Actualiza, modifica o elimina hospitales registrados"}
                                        url="/Hospitales/EditarHospitales"
                                        imageUrl={"https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
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