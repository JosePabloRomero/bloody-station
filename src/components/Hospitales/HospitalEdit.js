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

    const hospitales = useHospitales()
    let obj={}
    const [hospitalSelect, setHospitalSelect] = useState({})
    const [codigoHospital, setCodigoHospital] = useState("")
    const [nombreHospital, setNombreHospital] = useState("")
    const [latitudHospital, setLatitudHospital] = useState("")
    const [longitudHospital, setLongitudHospital] = useState("")
    const [telefonoHospital, setTelefonoHospital] = useState("")
    const [direccionHospital, setDireccionHospital] = useState("")
    const [urlHospital, setUrlHospital] = useState("")

    const writeHospital = (hospital) => {
        fire
            .database()
            .ref(`Hospital/${hospital.codigo}/`)
            .set(hospital)
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        if (hospitales !== null && hospitales !== undefined) {

        }

        const newHospital = {
            codigo: hospitalSelect.codigo,
            nombre: nombreHospital,
            latitud: latitudHospital,
            longitud: longitudHospital,
            telefono: telefonoHospital,
            direccion: direccionHospital,
            url: urlHospital,
            sangreABn: '0',
            sangreAn: '0',
            sangreAp: '0',
            sangreBn: '0',
            sangreOn: '0'
        }
        console.log(newHospital)
        writeHospital(newHospital)        
        alert("El hospital se actualizó correctamente")
    }
    const handleNombreChange = (e) => {
        setNombreHospital(e.target.value)
    }
    const handleLongitudChange = (e) => {
        setLongitudHospital(e.target.value)
    }
    const handleLatitudChange = (e) => {
        setLatitudHospital(e.target.value)
    }
    const handleDireccionChange = (e) => {
        setDireccionHospital(e.target.value)
    }
    const handleTelefonoChange = (e) => {
        setTelefonoHospital(e.target.value)
    }
    const handleCodigoHospital = (e) => {
        setCodigoHospital(e.target.value)
    }
    const handleUrlChange = (e) => {
        setUrlHospital(e.target.value)
    }
    const actualizar = () => {
        setCodigoHospital(obj.codigo)
        setNombreHospital(obj.nombre)
        setLongitudHospital(obj.longitud)
        setLatitudHospital(obj.latitud)
        setDireccionHospital(obj.direccion)
        setTelefonoHospital(obj.telefono)
        setUrlHospital(obj.url)
    }

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        obj = e.target.value
        setHospitalSelect(e.target.value)
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
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="codigo-hospital"
                                                    label=""
                                                    value={codigoHospital}                                                    
                                                    onChange={handleCodigoHospital}
                                                    helperText="Codigo del hospital"
                                                    disabled
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="nombre"
                                                    label=""                                                    
                                                    onChange={handleNombreChange}
                                                    defaultValue=""
                                                    value={nombreHospital}
                                                    helperText="Este campo actualiza el nombre"
                                                    variant="outlined"
                                                />

                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="latitud"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleLatitudChange}
                                                    value={latitudHospital}
                                                    helperText="Actualizar coordenada de latitud"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="longitud"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleLongitudChange}
                                                    value={longitudHospital}
                                                    helperText="Actualizar coordenada de longitud"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="direccion"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleDireccionChange}
                                                    value={direccionHospital}
                                                    helperText="Actualizar coordenada de direccion"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="telefono"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleTelefonoChange}
                                                    value={telefonoHospital}
                                                    helperText="Actualizar coordenada de telefono"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    id="url"
                                                    label=""
                                                    defaultValue=""
                                                    onChange={handleUrlChange}
                                                    value={urlHospital}
                                                    helperText="Direccion url imagen hospital"
                                                    variant="outlined"
                                                />
                                            </Grid>


                                            <Grid item xs={12} md={12} style={{ paddingTop: '5%' }}>
                                                <Button variant="contained" className={classes.button} type="submit" >
                                                    Actualizar Hospital
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