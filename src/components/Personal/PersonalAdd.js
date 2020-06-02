import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import fire from '../../config/Fire'

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
    //const hospitales = useHospitales()


    const writeUser = (newUsuario) => {
        fire
            .database()
            .ref(`PersonalAutorizado/`)
            .push()
            .set(newUsuario)
    }

    const handleRegister = (user) => {        
        fire.auth().createUserWithEmailAndPassword(user.correo, user.password)
            .catch((error) => {
                console.log(error)
                validateRegister(error)

            })
        writeUser(user)
        alert("El usuario: " + user.nombres + " " + user.apellidos + ", se agregó con exito")
    }
    const validateRegister = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                alert('¡El email no es valido!')
                break;
            case 'auth/weak-password':
                alert('La contraseña es demasiado corta')
                break;
            case 'auth/email-already-in-use':
                alert('Este email ya fue registrado previamente')
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newUsuario = {
            nombres: event.target[0].value,
            apellidos: event.target[2].value,
            cedula: event.target[4].value,
            contacto: event.target[6].value,
            correo: event.target[8].value,
            codigoHospital: event.target[10].value,
            password: event.target[12].value
        }
        handleRegister(newUsuario)
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
                                        <Typography variant="h3">Agregar un nuevo usuario autorizado para una entidad de salud registrada
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center' }}>

                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="nombres"
                                                    label="Nombre del usuario"
                                                    defaultValue=""
                                                    helperText="Ingrese el nombre del usuario autorizado"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="apellidos"
                                                    label="apellidos del usuario"
                                                    defaultValue=""
                                                    helperText="Ingrese los apellidos del usuario autorizado"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="cedula"
                                                    label="cedula del usuario"
                                                    defaultValue=""
                                                    helperText="Ingrese la cedula del usuario autorizado"
                                                    variant="outlined"
                                                />

                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="contacto"
                                                    label="Numero de telefono/celular"
                                                    defaultValue=""
                                                    helperText="Ingrese el telefono o celular del usuario"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="correo"
                                                    label="correo del usuario"
                                                    defaultValue=""
                                                    helperText="Ingrese el correo electronico del usuario"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="codigoHospital"
                                                    label="codigo del hospital"
                                                    defaultValue=""
                                                    helperText="Ingrese el codigo del hospital que representa"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="password"
                                                    label="Ingrese la contraseña"
                                                    defaultValue=""
                                                    type="password"
                                                    helperText="Ingrese la contraseña de acceso para el usuario"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} style={{ paddingTop: '5%' }}>
                                                <Button variant="contained" className={classes.button} type="submit" >
                                                    Agregar Usuario
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