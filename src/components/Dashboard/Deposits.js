import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import fire from '../../config/Fire.js'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function sumaDonaciones(listaUsuarios) {
  let suma = 0
  listaUsuarios.forEach(element => {
    suma += element.donaciones
  });
  return suma
}

function useListaUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([])

  useEffect(() => {    
    fire
      .database()
      .ref('Usuario/')
      .on('value', snapshot => {
        const newUser = snapshot.val()
        const listaUsuarios = Object.keys(newUser).map(key => ({
          ...newUser[key],
          donaciones: parseInt(newUser[key].donaciones),
          uid: key,
        }))
        setListaUsuarios(listaUsuarios)
      })
  }, [])  
  return listaUsuarios
}

export default function Deposits() {
  const classes = useStyles();
  const usuarios = useListaUsuarios();
  const cantidadDonaciones = sumaDonaciones(usuarios)
  return (
    <React.Fragment>
      <Title>Cantidad de donaciones totales</Title>
      <Typography component="p" variant="h4">
        {cantidadDonaciones}
      </Typography>      
    </React.Fragment>
  );
}