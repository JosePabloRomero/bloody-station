import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import SelectCard from '../SelectCard.js'
import selectCardList from '../consts.js'
/* const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
}) */

const useStyles = makeStyles(() => ({
    typographyStyles: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
}))

const Content = () => {
    const classes = useStyles()
    const getSelectCard = selectCard => {
        return (
            <Grid item xs={12} sm={4}>
                <SelectCard {...selectCard} />
            </Grid>
        );
    };
    return (

        <Grid container className={classes.typographyStyles}>
            <Typography variant='h1'>
                Bienvenido a Bloody Station
            </Typography>
            <Typography variant='h6' style={{paddingTop: '20px'}}>
                Seleccione una opción
            </Typography>
            {/* <Typography variant='h6' >                
                Bloody Station es una aplicación la cual busca facilitar la solicitud de sangre para las entidades hospitalarias,
                y además de esto informar a donantes frecuentes para que se enteren facilmente de lugares donde requieren donadores de sangre.
                Para continuar, por favor llene el siguente formulario, el cual nos ayudará a determinar si usted es un donador apto.
            </Typography> */}
            <Grid container spacing={2} style={{paddingTop: '20px'}}>
                {selectCardList.map(selectCard => getSelectCard(selectCard))}
            </Grid>
        </Grid>


    )
}

export default Content