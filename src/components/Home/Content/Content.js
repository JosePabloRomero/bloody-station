import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Hospitales from '../../Hospitales'
import SelectCard from '../SelectCard.js'
import selectCardList from '../consts.js'
/* const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
}) */


const useStyles = makeStyles(() => ({
    typographyStyles: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
}))

const Content = () => {
    const classes = useStyles()
    return (

        <Grid container className={classes.typographyStyles}>
            
            {/* <Typography variant='h6' >                
                Bloody Station es una aplicación la cual busca facilitar la solicitud de sangre para las entidades hospitalarias,
                y además de esto informar a donantes frecuentes para que se enteren facilmente de lugares donde requieren donadores de sangre.
                Para continuar, por favor llene el siguente formulario, el cual nos ayudará a determinar si usted es un donador apto.
            </Typography> */}
            <Grid container spacing={2} style={{ paddingTop: '20px' }}>
                <Grid item xs={12}>
                    <Typography variant='h1'>
                        Bienvenido a Bloody Station
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' style={{ paddingTop: '20px' }}>
                        Seleccione una opción
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <SelectCard
                        title={"Control de Hospitales"}
                        subtitle={""}
                        description={"En este apartado podrás registrar, eliminar, y actualizar datos relacionados con los hospitales"}
                        url="/Hospitales"
                        imageUrl={"https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <SelectCard
                        title={"Personal Hospitalario"}
                        subtitle={""}
                        description={"En este apartado podrás registrar, eliminar, y actualizar datos relacionados con delegados de cada entidad de donación"}
                        url="/Personal"
                        imageUrl={"https://images.pexels.com/photos/3957992/pexels-photo-3957992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <SelectCard
                        title={"Realizar Solicitud"}
                        subtitle={""}
                        description={"Realiza una solicitud de sangre para alguna entidad de donación de sangre"}
                        url="/Solicitudes"
                        imageUrl={"https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <SelectCard
                        title={"Dashboard"}
                        subtitle={""}
                        description={"Mira estadisticas e indicadores del flujo de datos y donaciones realizadas."}
                        url="/Dashboard"
                        imageUrl={"https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    />
                </Grid>
            </Grid>
        </Grid>


    )
}

export default Content