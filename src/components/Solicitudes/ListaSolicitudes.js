import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, IconButton, Button } from '@material-ui/core'
import fire from '../../config/Fire'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia } from "@material-ui/core";
import Header from '../Home/Header'
import SolicitudEspecifica from '../Solicitudes/SolicitudEspecifica.js'
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    root: {
        background: '#f0f0f0'

    },
    child: {
        background: '#573d32',
        color: '#fff',
        textAlign: 'center'
    },
    typographyStyles: {
        flex: 1
    },
    button: {
        background: '#003b75',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#573d32',
            borderColor: '#0062cc',
            boxShadow: 'none',
        }
    },
    card: {
        background: '#003b75',
        color: '#fff'
    }
}))


function useNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('Notificaciones/')
            .orderByChild('CodigoNotificacion')
            .on('value', snapshot => {
                const newNotificacion = snapshot.val()
                const listaNotificaciones = Object.keys(newNotificacion).map(key => ({
                    ...newNotificacion[key],
                    uid: key,
                }))
                setNotificaciones(listaNotificaciones)
            })
    }, [])
    return notificaciones
}


const App = (props) => {
    const classes = useStyles()
    let listaNotificaciones = useNotificaciones()
    listaNotificaciones.reverse()

    const handleClick = (codigoNotificacion) => {
        return (          
            props.handleCodigoNotificacion(codigoNotificacion)                                
        )
    }
    return (
        <div>
            <Grid container direction="column" style={{ paddingTop: '20px' }}>
                <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8} className={classes.root}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12}>
                                <div>
                                    <div className={classes.child}>
                                        <Typography variant="h3">Lista de Solicitudes
                                        </Typography>

                                    </div>
                                    <Grid item container spacing={2} style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>

                                        {listaNotificaciones.map((notificacion) =>

                                            <Grid item item xs={12} sm={4} key={notificacion.uid}>
                                                <Card>
                                                    <CardHeader
                                                        title={notificacion.tipoSangre + " " + notificacion.nombreHospital}
                                                        className={classes.card}
                                                    />


                                                    <CardMedia style={{ height: "150px" }} image={notificacion.urlHospi} />
                                                    <CardContent >
                                                        <div>
                                                            <Typography variant="body2" component="p">
                                                                <strong>Fecha:</strong> {notificacion.fecha} <strong> Hora:</strong> {notificacion.hora} <br></br>
                                                                {notificacion.comentarios} <br></br>
                                                                <strong>codigoHospital:</strong> {notificacion.codigoHospital}<br></br>

                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            className={classes.button}
                                                            onClick={() => {
                                                                handleClick(notificacion.codigoNotificacion)
                                                            }}
                                                            component={Link}
                                                            to="/Solicitudes/SolicitudEspecifica"
                                                        >
                                                            Posibles Donantes
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Grid>

                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={0} sm={2} />
                </Grid>
            </Grid>
        </div>
    )
}

export default App