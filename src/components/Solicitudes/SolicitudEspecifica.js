import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import fire from '../../config/Fire'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


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
    },
    table: {
        minWidth: 650,
    }
}))

function useNotifAceptadas() {
    const [notificaciones, setNotificaciones] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('notiAceptadas/')
            .orderByChild('codigoNoti')
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

function useNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('Notificaciones/')
            .orderByChild('codigoNotificacion')
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
function useListaUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('Usuario/')
            .on('value', snapshot => {
                const newUser = snapshot.val()
                const listaUsuarios = Object.keys(newUser).map(key => ({
                    ...newUser[key],
                    uid: key,
                }))
                setListaUsuarios(listaUsuarios)
            })
    }, [])
    return listaUsuarios
}

function encontrarNotificacionesEspecificas(codigoNotificacion, notificacionesAceptadas) {
    let notificacionesEncontradas = []
    notificacionesAceptadas.forEach(notificacion => {
        if (codigoNotificacion === notificacion.codigoNoti) {
            notificacionesEncontradas.push(notificacion)
        }
    });
    return notificacionesEncontradas
}

function encontrarNotificacion(codigoNotificacion, notificaciones) {
    let notificacionEncontrada = {}
    notificaciones.forEach(notificacion => {
        if (codigoNotificacion === notificacion.codigoNotificacion) {
            notificacionEncontrada = notificacion
        }
    });
    return notificacionEncontrada
}

function encontrarUsuariosEspecificos(listaNotificacionesEspecifica, listaUsuarios) {
    let usuariosDonantes = []
    listaNotificacionesEspecifica.forEach(notificacion => {
        listaUsuarios.forEach(usuario => {
            if (notificacion.cedula === usuario.cedula) {
                usuariosDonantes.push(usuario)
            }
        });
    });
    return usuariosDonantes
}

const App = (props) => {
    const classes = useStyles()
    const notificaciones = useNotificaciones()
    const notificacion = encontrarNotificacion(props.codigoNotificacion, notificaciones)
    const notificacionesAceptadas = useNotifAceptadas()
    const listaNotificacionesEspecifica = encontrarNotificacionesEspecificas(notificacion.codigoNotificacion, notificacionesAceptadas)
    let idNotificacion = ""
    const listaUsuarios = useListaUsuarios()

    const listaUsuariosEspecificos = encontrarUsuariosEspecificos(listaNotificacionesEspecifica, listaUsuarios)

    console.log(listaNotificacionesEspecifica)

    const writeUsuario = (id, usuario) => {
        fire
            .database()
            .ref(`Usuario/${id}/`)
            .set(usuario)
    }
    const deleteUserNotiAceptadas = (id) => {
        fire
            .database()
            .ref(`notiAceptadas/${id}/`)
            .remove()
    }
    const handleAsist = (usuario, asistencia) => {
        let newUsuario = {}
        if (asistencia) {
            newUsuario = { ...usuario, donaciones: (parseInt(usuario.donaciones) + 1).toString() }
            writeUsuario(usuario.uid, newUsuario)
        }
        listaNotificacionesEspecifica.forEach(notificacion => {
            if (usuario.cedula === notificacion.cedula) {
                deleteUserNotiAceptadas(notificacion.uid)
            }
        });
        
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
                                        <Typography variant="h3">Control de Asistencia
                                        </Typography>

                                    </div>
                                    <Grid item container spacing={2} style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                        <Grid item xs={12} sm={2} />
                                        <Grid item xs={12} sm={8} >
                                            <Grid item xs={12} sm={12} >
                                                <Card>
                                                    <CardHeader
                                                        title={notificacion.tipoSangre + " " + notificacion.nombreHospital}
                                                        className={classes.card}
                                                    />


                                                    <CardMedia style={{ height: "200px" }} image={notificacion.urlHospi} />
                                                    <CardContent >
                                                        <div>
                                                            <Typography variant="body2" component="p">
                                                                <strong>Fecha:</strong> {notificacion.fecha} <strong> Hora:</strong> {notificacion.hora} <br></br>
                                                                {notificacion.comentarios} <br></br>
                                                                <strong>codigoHospital:</strong> {notificacion.codigoHospital}<br></br>

                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={2} />
                                        <Grid item xs={12} sm={12} style={{ paddingTop: '20px' }}>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow >

                                                            <TableCell style={{ color: '#fff' }}><strong>Nombre del donador</strong></TableCell>
                                                            <TableCell align="center" style={{ color: '#fff' }}><strong>Tipo de sangre </strong></TableCell>
                                                            <TableCell align="center" style={{ color: '#fff' }}><strong>cedula</strong></TableCell>
                                                            <TableCell align="center" style={{ color: '#fff' }}><strong>Cantidad de donaciones </strong></TableCell>
                                                            <TableCell align="center" style={{ color: '#fff' }}><strong>Aprobar Donación</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listaUsuariosEspecificos.map((usuario) => (
                                                            <TableRow key={usuario.uid} >

                                                                <TableCell component="th" scope="row" style={{ color: '#fff' }}>
                                                                    {usuario.nombres + " " + usuario.apellidos}
                                                                </TableCell>
                                                                <TableCell align="center" style={{ color: '#fff' }}>{usuario.tipoSangre}</TableCell>
                                                                <TableCell align="center" style={{ color: '#fff' }}>{usuario.cedula}</TableCell>
                                                                <TableCell align="center" style={{ color: '#fff' }}>{usuario.donaciones}</TableCell>
                                                                <TableCell align="center" style={{ color: '#fff' }}>
                                                                    <IconButton
                                                                        aria-label="Log Out"
                                                                        style={{ color: '#fff' }}
                                                                        onClick={() => { handleAsist(usuario, true) }}
                                                                    >
                                                                        <CheckCircleIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        aria-label="Log Out"
                                                                        style={{ color: '#fff' }}
                                                                        onClick={() => { handleAsist(usuario, false) }}
                                                                    >
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </TableCell>

                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
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