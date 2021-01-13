import React, { useState, useEffect } from 'react'
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Error from './components/Error';


function App() {
const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais:''
});

const { ciudad, pais } = busqueda;

const [consultar, setConsultar] = useState(false);
const [ resultado, setResultado ] = useState({});
const [error,guardarError] = useState(false);
useEffect(() => {
  const consultarApi = async () => {
   if(consultar){
    const appId = 'd0000347b9ed8d4bc0ff7d6d9b7fc50f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    const respuesta = await fetch(url);
    const resultado  = await respuesta.json();
    setResultado(resultado);
    setConsultar(false);

    //detecta si hubo resultados correctos en la consulta  
    if(resultado.cod === "404"){
      guardarError(true);
    }else{
      guardarError(false);
    }

   }
  }
  consultarApi();
 }, [consultar]);
 
 let componente;
 if(error) {
  componente = <Error mensaje="No hay resultados"/>
 }else{
 componente =  <Clima
                resultado = { resultado }
                />
 }

  return (
    <div>
      <Header
      titulo = "Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
              <div className="col m6 s12">
                <Formulario 
                busqueda = { busqueda }
                setBusqueda = { setBusqueda }
                setConsultar  = { setConsultar} 
                />
              </div>
              <div className="col m6 s12">
                 { componente }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
