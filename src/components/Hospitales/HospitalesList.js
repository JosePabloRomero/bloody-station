import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, IconButton } from '@material-ui/core'
import fire from '../../config/Fire'
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(() => ({
    root: {
        background: '#f0f0f0'

    },
    child: {
        background: 'linear-gradient(45deg, #E03A3F 30%, #FF8E53 90%)',
        color: '#fff',
        textAlign: 'center'
    },
    typographyStyles: {
        flex: 1
    },
    button: {
        background: '#E03A3F',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#FF8E53',
            borderColor: '#0062cc',
            boxShadow: 'none',
        }
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

const DetallesHospital = (props) => {
    const { latitud, longitud, codigo } = props
    return (
        <div>
            <ul>
                <Typography>
                    <li>Latitud: {latitud}</li>
                    <li>Longitud: {longitud}</li>
                    <li>codigo: {codigo}</li>
                    <li><a href="#">Ver Ubicación</a></li>
                </Typography>
            </ul>
        </div>
    )
}

const App = () => {
    const classes = useStyles()
    const hospitales = useHospitales()
    const [showDetails, setDetails] = useState(false)
    const toggleDetails = () => {
        if (showDetails) {
            setDetails(false)
        } else {
            setDetails(true)
        }
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
                                        <Typography variant="h3">Lista de Hospitales
                                        <IconButton
                                                aria-label="InfoIcon"
                                                style={{ color: '#fff' }}
                                                onClick={toggleDetails}
                                                
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </Typography>

                                    </div>

                                    <ol>
                                        {hospitales.map((hospital) =>
                                            <li key={hospital.codigo}>
                                                <div className={classes.typographyStyles}>
                                                    <Typography>{hospital.nombre}
                                                    </Typography>
                                                    {showDetails && <DetallesHospital latitud={hospital.latitud} longitud={hospital.longitud} codigo={hospital.codigo} />}

                                                </div>
                                            </li>
                                        )}

                                    </ol>
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