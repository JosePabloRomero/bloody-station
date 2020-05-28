import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, IconButton, Button } from '@material-ui/core'
import fire from '../../config/Fire'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia } from "@material-ui/core";


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
        background:  '#003b75',
        color: '#fff'
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
                                        </Typography>

                                    </div>
                                    <Grid item container spacing={2} style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>

                                        {hospitales.map((hospital) =>

                                            <Grid item item xs={12} sm={4} key={hospital.codigo}>
                                                <Card>
                                                    <CardHeader
                                                        title={hospital.nombre}
                                                        className={classes.card}                                                        
                                                    />


                                                    <CardMedia style={{ height: "150px" }} image={hospital.url} />
                                                    <CardContent >
                                                        <div>
                                                            <Typography variant="body2" component="p">

                                                                <strong>Latitud:</strong> {hospital.latitud} <br></br>
                                                                <strong>Longitud:</strong> {hospital.longitud}<br></br>
                                                                <strong>codigo:</strong> {hospital.codigo}<br></br>
                                                                <strong>telefono:</strong> {hospital.telefono}<br></br>
                                                                <strong>direccion:</strong> {hospital.direccion}<br></br>

                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    {/* <CardActions>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            className={classes.button}
                                                            to={hospital.url}>
                                                            Ver Ubicación
                                                        </Button>
                                                    </CardActions> */}
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