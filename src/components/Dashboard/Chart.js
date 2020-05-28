import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import fire from '../../config/Fire.js'
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = []

function asignarDatos(datos) {
  let cantidadDonaciones = 0
  if (data.length !== datos.length) {
    datos.forEach(obj => {
      cantidadDonaciones = obj.Op + obj.On + obj.An + obj.Ap + obj.Bn + obj.Bp + obj.ABn + obj.ABp
      data.push(createData(obj.fecha, cantidadDonaciones))
    });
  }

}

function useNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    fire
      .database()
      .ref('Notificaciones/')
      .orderByChild('fecha')
      .on('value', snapshot => {
        const newNotificacion = snapshot.val()
        const listaNotificaciones = Object.keys(newNotificacion).map(key => ({
          ...newNotificacion[key],
          uid: key,
        }))
        setNotificaciones(listaNotificaciones)
      })
      
  }, [])
  return notificaciones
}

function asignarPunto(obj, notificacion) {
  let newObj = {}
  switch (notificacion.tipoSangre) {
    case 'O-':
      newObj = { ...obj, On: (obj.On + 1) }
      break;
    case 'O+':
      newObj = { ...obj, Op: (obj.Op + 1) }
      break;
    case 'A-':
      newObj = { ...obj, An: (obj.An + 1) }
      break;
    case 'A+':
      newObj = { ...obj, Ap: (obj.Ap + 1) }
      break;
    case 'B-':
      newObj = { ...obj, Bn: (obj.Bn + 1) }
      break;
    case 'B+':
      newObj = { ...obj, Bp: (obj.Bp + 1) }
      break;
    case 'AB-':
      newObj = { ...obj, ABn: (obj.ABn + 1) }
      break;
    case 'AB+':
      newObj = { ...obj, ABp: (obj.ABp + 1) }
      break;

    default:
      break;
  }
  return newObj
}
function llenadoDatos(listaFechas, notificaciones) {
  const data = []
  let obj = {}
  for (let index = 0; index < listaFechas.length; index++) {
    obj = {
      fecha: listaFechas[index],
      On: 0,
      Op: 0,
      An: 0,
      Ap: 0,
      Bn: 0,
      Bp: 0,
      ABn: 0,
      ABp: 0
    }
    // eslint-disable-next-line no-loop-func
    notificaciones.forEach(notificacion => {
      if (listaFechas[index] === notificacion.fecha) {
        obj = asignarPunto(obj, notificacion)
      }
    });
    data.push(obj)
  }
  return data

}
function fechas(notificaciones) {
  const fechasRegistradas = []
  notificaciones.forEach(notificacion1 => {
    notificaciones.forEach(notificacion2 => {
      if (notificacion1.fecha === notificacion2.fecha) {
        if (!fechasRegistradas.includes(notificacion1.fecha)) {
          fechasRegistradas.push(notificacion1.fecha)
        }
      }
    })
  });
  return fechasRegistradas
}

export default function Chart() {
  const theme = useTheme();
  const notificaciones = useNotificaciones()
  const listaFechas = fechas(notificaciones)
  const datos = llenadoDatos(listaFechas, notificaciones)
  asignarDatos(datos)
  return (
    <React.Fragment>
      <Title>Flujo de solicitudes generadas</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Cantidad de solicitudes
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}