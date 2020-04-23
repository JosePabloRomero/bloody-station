import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
    return (
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
                    onClick={props.logOutClick}
                >
                    <ExitToAppIcon />
                </IconButton>

                <Typography>
                    Home
                </Typography>
                <IconButton
                    aria-label="Home"
                    style={{ color: '#fff' }}
                >
                    <HomeIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}

export default Header