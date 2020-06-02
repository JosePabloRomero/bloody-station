import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import fire from '../../config/Fire.js'
// Generate Order Data
function createData(id, nombre, cedula, correo, donaciones, tipoSangre) {
  return { id, nombre, cedula, correo, donaciones, tipoSangre };
}

let rows = [];
function agregarDatos(listaUsuarios) {
  listaUsuarios.sort(function (a, b) {
    if (a.donaciones > b.donaciones) {
      return 1;
    }
    if (a.donaciones < b.donaciones) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  listaUsuarios.reverse()
  listaUsuarios.forEach(element => {
    rows.push(createData(element.uid, element.nombres + " " + element.apellidos, element.cedula, element.correo, element.donaciones, element.tipoSangre))
  });
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
export default function Orders() {
  const listaUsuarios = useListaUsuarios();
  rows = []
  agregarDatos(listaUsuarios)
  
  return (
    <React.Fragment>
      <Title>Top Donadores de sangre</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cedula</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Cantidad Donaciones</TableCell>
            <TableCell align="right">Tipo de sangre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.cedula}</TableCell>
              <TableCell>{row.correo}</TableCell>
              <TableCell>{row.donaciones}</TableCell>
              <TableCell align="right">{row.tipoSangre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>      
    </React.Fragment>
  );
}