import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, IconButton, Button } from '@material-ui/core'
import fire from '../../config/Fire'
import InfoIcon from '@material-ui/icons/Info';
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

function ImagenAleatoria() {
    const listaImagenes = [
        "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1470688090067-6d429c0b2600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
        "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
        "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    ]
    const aleatorio = parseInt(Math.random() * ((listaImagenes.length - 1) - 0) + 0);    
    return listaImagenes[aleatorio]

}

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
    const personalList = usePersonal()    
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
                                        <Typography variant="h3">Lista de personal autorizado para realizar solicitudes
                                        </Typography>

                                    </div>
                                    <Grid item container spacing={2} style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                        {personalList.map((personal) =>

                                            <Grid item item xs={12} sm={4} key={personal.uid}>
                                                <Card>
                                                    <CardHeader
                                                        title={personal.nombres + " " + personal.apellidos}
                                                        className={classes.card}                                                        
                                                    />


                                                    <CardMedia style={{ height: "150px" }} image={ImagenAleatoria()} />
                                                    <CardContent >
                                                        <div>
                                                            <Typography variant="body2" component="p">

                                                                <strong>Nombres:</strong> {personal.nombres} <br></br>
                                                                <strong>Apellidos:</strong> {personal.apellidos}<br></br>
                                                                <strong>Cedula:</strong> {personal.cedula}<br></br>
                                                                <strong>Numero Contacto:</strong> {personal.contacto}<br></br>
                                                                <strong>Correo:</strong> {personal.correo}<br></br>
                                                                <strong>Hospital:</strong> {personal.codigoHospital}<br></br>
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            className={classes.button}
                                                            >
                                                            Editar
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