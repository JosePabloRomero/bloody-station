import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core'
import fire from '../../../config/Fire'
import { makeStyles } from '@material-ui/styles'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    root: {
        background: 'linear-gradient(45deg, #E03A3F 30%, #FF8E53 90%)'
    },
    typographyStyles: {
        flex: 1
    }
}))

const Header = (props) => {
    const classes = useStyles()
    const logOutClick = () => {
        fire.auth().signOut()
    }
    return (
        <Grid item>
            <AppBar position="static" className={classes.root}>
                <Toolbar>

                    <Typography className={classes.typographyStyles}>
                        Bloody Station
                </Typography>

                    <Typography>
                        Log Out
                </Typography>
                    <IconButton
                        aria-label="Log Out"
                        style={{ color: '#fff' }}
                        onClick={logOutClick}
                    >
                        <ExitToAppIcon />
                    </IconButton>

                    <Typography>
                        Home
                </Typography>
                    <IconButton
                        aria-label="Home"
                        style={{ color: '#fff' }}
                        component={Link}
                        to='/Home'
                    >
                        <HomeIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Grid>
    )
}

export default Header