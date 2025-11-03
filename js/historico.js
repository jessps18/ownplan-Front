// === Gráfico de Ganhos e Perdas (dados estáticos) ===

// Meses do ano
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Dados de demonstração
const ganhos = [1200, 1450, 1600, 2000, 1800, 2200, 1950, 2100, 2500, 2400, 2300, 2600];
const perdas = [800, 700, 900, 1100, 950, 1000, 1050, 850, 1200, 1100, 1300, 1250];

// Configuração dos dados do gráfico
const data = {
  labels: meses,
  datasets: [
    {
      label: 'Ganhos (R$)',
      data: ganhos,
      borderColor: '#00c853',
      backgroundColor: 'rgba(0, 200, 83, 0.2)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Perdas (R$)',
      data: perdas,
      borderColor: '#d50000',
      backgroundColor: 'rgba(213, 0, 0, 0.2)',
      tension: 0.4,
      fill: true,
    }
  ]
};

// Configurações gerais do gráfico
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            family: 'Almendra SC',
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Ganhos e Perdas Mensais — 2025',
        color: 'white',
        font: {
          family: 'Almendra SC',
          size: 18
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor (R$)',
          color: 'white'
        },
        ticks: {
          color: 'white', // COR DOS NÚMEROS DO EIXO Y
          font: {
            family: 'Almendra SC',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.25)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
          color: 'white'
        },
        ticks: {
          color: 'white', // COR DOS NOMES DOS MESES
          font: {
            family: 'Almendra SC',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.25)'
        }
      }
    }
  },
};

// Renderiza o gráfico
const ctx = document.getElementById('graficoGanhos');
new Chart(ctx, config);
