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

function usePersonal() {
    const [personal, setPersonal] = useState([])

    useEffect(() => {
        fire
            .database()
            .ref('PersonalAutorizado/')
            .on('value', snapshot => {
                const newPersonal = snapshot.val()
                const users = Object.keys(newPersonal).map(key => ({
                    ...newPersonal[key],
                    uid: key,
                }));
                setPersonal(users)
            })
    }, [])
    return personal
}

const App = () => {
    const classes = useStyles()

    const personal = usePersonal()
    let obj = {}
    const [personalSelect, setPersonalSelect] = useState({})
    const [nombrePersonal, setNombrePersonal] = useState("")
    const [apellidoPersonal, setApellidoPersonal] = useState("")
    const [cedulaPersonal, setCedulaPersonal] = useState("")
    const [hospitalPersonal, setHospitalPersonal] = useState("")
    const [contactoPersonal, setContactoPersonal] = useState("")
    const [correoPersonal, setCorreoPersonal] = useState("")
    const [passwordPersonal, setPasswordPersonal] = useState("")

    const writePersonal = (persona, uid) => {
        fire
            .database()
            .ref(`PersonalAutorizado/${uid}/`)
            .set(persona)
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        const newPersonal = {
            cedula: cedulaPersonal,
            nombres: nombrePersonal,
            apellidos: apellidoPersonal,
            codigoHospital: hospitalPersonal,
            contacto: contactoPersonal,
            correo: correoPersonal,
            password: passwordPersonal            
        }
        console.log(newPersonal)
        writePersonal(newPersonal, personalSelect.uid)
        alert("El Personal se actualizó correctamente")
    }
    const handleNombreChange = (e) => {
        setNombrePersonal(e.target.value)
    }
    const handleApellidoPersonal = (e) => {
        setApellidoPersonal(e.target.value)
    }
    const handleCedulaPersonal = (e) => {
        setCedulaPersonal(e.target.value)
    }
    const handleCorreoPersonal = (e) => {
        setCorreoPersonal(e.target.value)
    }
    const handleCodigoHospital = (e) => {
        setHospitalPersonal(e.target.value)
    }
    const handleContactoPersonal = (e) => {
        setContactoPersonal(e.target.value)
    }
    const handlePasswordPersonal = (e) => {
        setPasswordPersonal(e.target.value)
    }
    const actualizar = () => {
        setNombrePersonal(obj.nombres)
        setApellidoPersonal(obj.apellidos)
        setCedulaPersonal(obj.cedula)
        setHospitalPersonal(obj.codigoHospital)
        setCorreoPersonal(obj.correo)
        setContactoPersonal(obj.contacto)
        setPasswordPersonal(obj.password)
    }

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        obj = e.target.value
        setPersonalSelect(e.target.value)
        actualizar()
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
                                        <Typography variant="h3">Actualizar un Hospital
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center' }}>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="select-persona"
                                                    select
                                                    label="Seleccione una Persona"
                                                    value={personalSelect}
                                                    onChange={handleChange}
                                                    helperText="Seleccione la persona a editar"
                                                    variant="outlined"
                                                >
                                                    {personal.map((option) => (
                                                        <MenuItem key={option.uid} value={option}>
                                                            {option.nombres + " " + option.apellidos}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="codigo-hospital"
                                                    label=""
                                                    value={hospitalPersonal}
                                                    onChange={handleCodigoHospital}
                                                    helperText="Codigo del hospital al que pertenece"                                                    
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="nombre"
                                                    label=""
                                                    onChange={handleNombreChange}
                                                    defaultValue=""
                                                    value={nombrePersonal}
                                                    helperText="Este campo actualiza el nombre"
                                                    variant="outlined"
                                                />

                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="apellido"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleApellidoPersonal}
                                                    value={apellidoPersonal}
                                                    helperText="Este campo actualiza el apellido"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="cedula"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleCedulaPersonal}
                                                    value={cedulaPersonal}
                                                    helperText="Este campo actualiza la cedula"
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="direccion"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleCorreoPersonal}
                                                    value={correoPersonal}
                                                    helperText="Actualizar el correo"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="telefono"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleContactoPersonal}
                                                    value={contactoPersonal}
                                                    helperText="Actualizar el numero de contacto"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="url"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handlePasswordPersonal}
                                                    value={passwordPersonal}
                                                    helperText="Actualizar contraseña"
                                                    variant="outlined"
                                                />
                                            </Grid>


                                            <Grid item xs={12} md={12} style={{ paddingTop: '5%' }}>
                                                <Button variant="contained" className={classes.button} type="submit" >
                                                    Actualizar Personal
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