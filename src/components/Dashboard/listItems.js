import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Link } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import fire from '../../config/Fire'

const logOutClick = () => {
  fire.auth().signOut()
}
export const mainListItems = (  
  <div >
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to={"/Solicitudes"}>
      <ListItemIcon>
        <AssignmentIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Modulo Solicitudes" />
    </ListItem>
    <ListItem button component={Link} to={"/Personal"}>
      <ListItemIcon>
        <PeopleIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Control de Personal" />
    </ListItem>
    <ListItem button component={Link} to={"/Hospitales"}>
      <ListItemIcon>
        <LocalHospitalIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Modulo de Hospitales" />
    </ListItem>
    <ListItem button component={Link} to={"/Home"}>
      <ListItemIcon>
        <HomeIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Volver al Inicio" />
    </ListItem>
    <ListItem button onClick={() => logOutClick()}>
      <ListItemIcon>
        <ExitToAppIcon style={{color: '#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Salir de Bloody Station" />
    </ListItem>
  </div>
);
