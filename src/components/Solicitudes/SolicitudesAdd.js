import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, Button, TextField, MenuItem } from '@material-ui/core'
import fire from '../../config/Fire'
import moment from "moment";

const useStyles = makeStyles(() => ({
    root: {
        background: '#f0f0f0',


    },
    child: {
        background: 'linear-gradient(45deg, #E03A3F 30%, #FF8E53 90%)',
        color: '#fff',
        textAlign: 'center'
    },
    button: {
        background: '#E03A3F',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#FF8E53',
            borderColor: '#0062cc',
            boxShadow: 'none',
        }
    },
    typography: {
        color: '#000'
    }
}))

function useNotificaciones() {
    const [notificacion, setNotificacion] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('Notificaciones')
            .on('value', snapshot => {
                const newNotificacion = snapshot.val()
                setNotificacion(newNotificacion)
            })
    }, [])
    return notificacion
}

function useHospitales() {
    const [hospital, setHospital] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('Hospital')
            .on('value', snapshot => {
                const newHospital = snapshot.val()
                setHospital(newHospital)
            })
    }, [])
    return hospital
}

const App = () => {
    const classes = useStyles()
    const [hospitalSelect, setHospitalSelect] = useState({})
    const [tipoDeSangre, setTipoDeSangre] = useState('')
    const hospitales = useHospitales()
    const notificaciones = useNotificaciones()
    const fechaActual= moment().format("DD-MM-YYYY")

    const writeNotificacion = (id, newNotificacion) => {
        fire
            .database()
            .ref(`Notificaciones/${id}/`)            
            .set(newNotificacion)
    }
    const toggleMandarNotificacion = (nombreHospital, tipoSangre) => {
        const toggleNoti = {
            cHospital: nombreHospital,
            sangre: tipoSangre,
            manda: true,
        }
        fire
            .database()
            .ref(`MandarNotificacion/Cambio/`)            
            .set(toggleNoti)
    }

    const handleChangeSangre = (event) => {
        setTipoDeSangre(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        let idNumero = 1     
        if(notificaciones !== null && notificaciones !== undefined ) {
            idNumero = parseInt(notificaciones.pop().codigoNotificacion) + 1            
        }           
        const idNotificacion = idNumero.toString()     
        const horaActual = moment().format("hh:mm:ss")    
        const newNotificacion = {
            codigoHospital: hospitalSelect.codigo,
            codigoNotificacion: idNotificacion,
            comentarios: event.target[4].value,
            fecha: fechaActual,
            hora: horaActual,    
            nombreHospital: hospitalSelect.nombre,
            tipoSangre: tipoDeSangre,
            urlHospi: hospitalSelect.url,            
            urlSangre: ""
        }
        writeNotificacion(idNotificacion, newNotificacion)
        toggleMandarNotificacion(hospitalSelect.nombre, tipoDeSangre)
        alert("La solicitud se envió con exito")
    }

    const handleChange = (e) => {
        setHospitalSelect(e.target.value)        
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
                                        <Typography variant="h3">Crear una solicitud (enviar notificación)
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center' }}>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="select-hospital"
                                                    select
                                                    label="Seleccione un hospital"
                                                    value={hospitalSelect}
                                                    onChange={handleChange}
                                                    helperText="Seleccione el hospital para el cual se genera la notificacion"
                                                    variant="outlined"
                                                >
                                                    {hospitales.map((option) => (
                                                        <MenuItem key={option.codigo} value={option}>
                                                            {option.nombre}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>                                                
                                            
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                            <TextField
                                                    id="codigo-hospital"
                                                    label=""
                                                    value={hospitalSelect.codigo}
                                                    helperText="Codigo del hospital"
                                                    disabled
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="comentarios"
                                                    label="Ingrese una descripción"
                                                    defaultValue=""
                                                    helperText="Comentarios acerca de la solicitud"
                                                    variant="outlined"
                                                />

                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="tipo-sangre"
                                                    label="Seleccione el tipo de sangre"   
                                                    select                                                 
                                                    value={tipoDeSangre}
                                                    onChange={handleChangeSangre}
                                                    helperText="Ingrese el tipo de sangre que se mostrará en la notificación"
                                                    variant="outlined"
                                                >
                                                    <MenuItem  key="1" value='O-'>O-</MenuItem>                                                           
                                                    <MenuItem  key="2" value='O+'>O+</MenuItem>                                                           
                                                    <MenuItem  key="3" value='A-'>A-</MenuItem>                                                           
                                                    <MenuItem  key="4" value='A+'>A+</MenuItem>                                                           
                                                    <MenuItem  key="5" value='B-'>B-</MenuItem>                                                           
                                                    <MenuItem  key="6" value='B+'>B+</MenuItem>                                                           
                                                    <MenuItem  key="7" value='AB-'>AB-</MenuItem>                                                           
                                                    <MenuItem  key="8" value='AB+'>AB+</MenuItem>   
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="fecha"
                                                    label="Fecha"
                                                    defaultValue=""
                                                    disabled
                                                    value={fechaActual}                                                    
                                                    helperText="Fecha en que se crea la notificación"
                                                    variant="outlined"
                                                />
                                            </Grid>                                        
                                            
                                      
                                            <Grid item xs={12} md={12} style={{ paddingTop: '5%' }}>
                                                <Button variant="contained" className={classes.button} type="submit" >
                                                    Enviar Solicitud
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </form>
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