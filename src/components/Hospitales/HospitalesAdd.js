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
    const hospitales = useHospitales()


    const writeHospital = (id, newHospital) => {
        fire
            .database()
            .ref(`Hospital/${id}/`)
            .set(newHospital)
    }

    const handleSubmit = (event) => {        
        event.preventDefault()          
        let id = 1     
        if(hospitales !== null && hospitales !== undefined ) {
            id = parseInt(hospitales.pop().codigo) + 1
            console.log('hola')
        }                           
        const newHospital = {
            nombre: event.target[0].value,
            latitud: event.target[2].value,
            longitud: event.target[4].value,
            codigo: id
        }       
        writeHospital(id,newHospital)  
        alert("El Hospital: " + newHospital.nombre + ", se agregó con exito") 
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
                                        <Typography variant="h3">Agregar un Hospital
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', textAlign: 'center' }}>

                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="nombre-hospital"
                                                    label="Nombre del Hospital"
                                                    defaultValue=""
                                                    helperText="Ingrese el nombre del hospital"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="latitud"
                                                    label="Coordenada de latitud"
                                                    defaultValue=""
                                                    helperText="Ingrese la ubicación del hospital (latitud)"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    id="longitud"
                                                    label="Coordenada de longitud"
                                                    defaultValue=""
                                                    helperText="Ingrese la ubicación del hospital (longitud)"
                                                    variant="outlined"
                                                />

                                            </Grid>
                                            <Grid item xs={12} md={12} style={{ paddingTop: '5%' }}>
                                                <Button variant="contained" className={classes.button} type="submit" >
                                                    Agregar Hospital
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