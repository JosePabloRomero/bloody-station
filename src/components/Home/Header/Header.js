import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}))

const Header = () => {
    const classes = useStyles()
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    This ir our header                    
                </Typography>
                <HomeIcon />
            </Toolbar>
        </AppBar>
    )
}

export default Header