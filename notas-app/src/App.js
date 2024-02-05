import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3977/api/v1/alumnos')
      .then(response => {
        setAlumnos(response.data.filter(alumno => alumno.progresos.some(progreso => progreso.notas.length > 0)));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const calcularTotal = (notas) => {
    if (!notas || notas.length === 0) return 0;

    const suma = notas.reduce((total, nota) => total + nota.valor, 0);
    return suma / notas.length;
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <header className="App-header">
        <h1>Tabla de Alumnos</h1>
        <table style={{ borderCollapse: 'collapse', width: '80%', border: '1px solid black' }}>
          <thead>
            <tr style={{ border: '1px solid black' }}>
              <th style={{ border: '1px solid black' }}>Nombre</th>
              <th style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>Progreso 1</th>
              <th style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>Progreso 2</th>
              <th style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>Progreso 3</th>
              <th style={{ border: '1px solid black' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(alumno => (
              <tr key={alumno._id} style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}>{alumno.nombre}</td>
                <td style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>{parseFloat(calcularTotal(alumno.progresos[0]?.notas) * 0.25).toFixed(2)}</td>
                <td style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>{parseFloat(calcularTotal(alumno.progresos[1]?.notas) * 0.35).toFixed(2)}</td>
                <td style={{ border: '1px solid black', whiteSpace: 'nowrap', textAlign: 'center' }}>{parseFloat(calcularTotal(alumno.progresos[2]?.notas) * 0.4).toFixed(2)}</td>
                <td style={{ border: '1px solid black', color: calcularTotal(alumno.progresos[0]?.notas) < 6 || calcularTotal(alumno.progresos[1]?.notas) < 6 || calcularTotal(alumno.progresos[2]?.notas) < 6 ? 'red' : 'inherit', textAlign: 'center' }}>
                  {(
                    (parseFloat(calcularTotal(alumno.progresos[0]?.notas)) * 0.25) +
                    (parseFloat(calcularTotal(alumno.progresos[1]?.notas)) * 0.35) +
                    (parseFloat(calcularTotal(alumno.progresos[2]?.notas)) * 0.4)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
