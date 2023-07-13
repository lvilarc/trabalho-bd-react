import logo from './logo.svg';
import './App.css';
import BarChart from './components/BarChart';
import { useEffect, useState } from 'react';
import { Data, consulta1example, consulta3example, consulta4example } from './Data';
import { Chart as ChartJS } from 'chart.js/auto'
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import axios from 'axios';

function App() {
  const [consulta1, setConsulta1] = useState(null);
  const [consulta2, setConsulta2] = useState(null);
  const [consulta3, setConsulta3] = useState(null);
  const [consulta4, setConsulta4] = useState(null);
  const [consulta5, setConsulta5] = useState(null);



  const options_consulta_1 = {
    indexAxis: 'y', // Define o eixo x como o eixo horizontal

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,

        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://localhost:3030/consulta1');
        setConsulta1({
          labels: response.data.map((data) => data.senador),
          datasets: [{
            label: "Quantidade de partidos já filiados",
            data: response.data.map((data) => data.partidos_senador),
            backgroundColor: [
              "#2250bd",
            ],
            // borderColor: "black",
            // borderWidth: 2,
          }]
        });
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://localhost:3030/consulta2');
        setConsulta2({
          labels: response.data.map((data) => data.bancada),
          datasets: [{
            label: "Quantidade de relatorias",
            data: response.data.map((data) => data.relatorias),
            backgroundColor: [
              "#eb4034",
              "#2250bd"

            ],
            // borderColor: "black",
            // borderWidth: 2,
          }]
        });
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    const fetchData3 = async () => {
      try {
        const response = await axios.get('http://localhost:3030/consulta3');
        setConsulta3({
          labels: response.data.map((data) => data.partido),
          datasets: [{
            label: "Quantidade de autores",
            data: response.data.map((data) => data.materias),
            backgroundColor: [
              "#eb4034",
              "#2250bd",
              "#3c9929"
            ],
            // borderColor: "black",
            // borderWidth: 2,
          }]
        });
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    const fetchData4 = async () => {
      try {
        const response = await axios.get('http://localhost:3030/consulta4');
        setConsulta4({
          labels: response.data.map((data) => data.bancada),
          datasets: [{
            label: "Quantidade de partidos já filiados",
            data: response.data.map((data) => data.discursos),
            backgroundColor: [
              "#2250bd",
            ],
            // borderColor: "black",
            // borderWidth: 2,
          }]
        });
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    const fetchData5 = async () => {
      try {
        const response = await axios.get('http://localhost:3030/consulta5');
        console.log(response.data)
        setConsulta5({
          labels: response.data.map((data) => data.senador),
          datasets: [{
            label: "Quantidade de relatorias",
            data: response.data.map((data) => data.relatorias),
            backgroundColor: [
              "#2250bd",
            ],
            // borderColor: "black",
            // borderWidth: 2,
          }]
        });
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
  }, []);

  return (
    <div className="App">

      <h2>Top 3 senadores que mais trocaram de partido</h2>
      {consulta1 !== null && (
        <div className="Grafico1">
          <BarChart chartData={consulta1} options={options_consulta_1} />
        </div>
      )}

      <h2>Quantidade de relatorias dos top 2 blocos parlamentares com mais membros</h2>
      {consulta2 !== null && (
        <div className="Grafico2">
          <PieChart chartData={consulta2} />
        </div>
      )}

      <h2>Top 3 partidos com mais autores</h2>
      {consulta3 !== null && (
        <div className="Grafico2">
          <PieChart chartData={consulta3} />
        </div>
      )}

      <h2>Ranqueamento de bancadas por total de discursos por senador</h2>
      {consulta4 !== null && (
        <div className="Grafico4">
          <BarChart chartData={consulta4}  />
        </div>
      )}
      
      
      <h2>Relatorias por senador</h2>
      {consulta5 !== null && (
        <div className="Grafico5">
          <BarChart chartData={consulta5}  options={options_consulta_1}/>
        </div>
      )}

    
    </div>
  );
}

export default App;
