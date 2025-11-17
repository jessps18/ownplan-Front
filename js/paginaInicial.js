const ctx = document.getElementById('gaugeChart');

const limiteSalvo = localStorage.getItem("limiteUsuario");
const limite = limiteSalvo ? Number(limiteSalvo) : 2000;
let saldo = limite;

document.getElementById("valorLimite").textContent = `R$ ${limite.toFixed(2)}`;


const porcentagem = (saldo / limite) * 100;

let corAtual;
if (porcentagem < 30) corAtual = 'red';
else if (porcentagem < 60) corAtual = 'yellow';
else corAtual = 'green';

const grafico = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Saldo', 'Gasto'],
    datasets: [{
      data: [porcentagem, 100 - porcentagem],
      backgroundColor: [corAtual, '#333'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
      cutout: '70%',
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => {
            if (context.label === 'Saldo') {
              return `Saldo: R$${saldo.toFixed(2)}`;
            } else {
              const gasto = limite - saldo;
              return `Gasto: R$${gasto.toFixed(2)}`;
            }
          }
        }
      }
    }
  }
});

const historicoDiv = document.getElementById("historico");

function atualizarHistorico(tipo, valor, descricao) {
  const input = document.createElement("input");
  input.type = "text";
  input.readOnly = true;

  input.value = `${tipo === "ganho" ? "💰 +" : "💸 -"} R$ ${valor.toFixed(2)} — ${descricao}`;

  historicoDiv.prepend(input);
}


document.getElementById("addTransacao").addEventListener("click", () => {
  Swal.fire({
    title: "Nova transação",
    html: `
      <select id="tipo" class="swal2-input">
        <option value="ganho">💰 Ganho</option>
        <option value="gasto">💸 Gasto</option>
      </select>
      <input id="valor" type="number" class="swal2-input" placeholder="Valor (R$)">
      <input id="desc" type="text" class="swal2-input" placeholder="Descrição">

    `,
    confirmButtonText: "Salvar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const tipo = document.getElementById("tipo").value;
      const valor = Number(document.getElementById("valor").value);
      const descricao = document.getElementById("desc").value;

      if (!valor || valor <= 0) {
        Swal.showValidationMessage("Informe um valor válido!");
        return false;
      }

      if (tipo === "ganho") saldo += valor;
      else saldo -= valor;

      localStorage.setItem("saldoAtual", saldo);
      atualizarGrafico();
      atualizarHistorico(tipo, valor, descricao);
    }
  });
});


// Atualiza gráfico e textos
function atualizarGrafico() {
  const gasto = limite - saldo;
  const porcentagem = (saldo / limite) * 100;
  let cor;
  if (porcentagem < 30) cor = 'red';
  else if (porcentagem < 60) cor = 'yellow';
  else cor = 'green';

  grafico.data.datasets[0].data = [porcentagem, 100 - porcentagem];
  grafico.data.datasets[0].backgroundColor = [cor, '#333'];
  grafico.update();

  
}
