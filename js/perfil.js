// === Carregar informações salvas ===
const limiteSalvo = localStorage.getItem("limiteUsuario");
const nomeUser = localStorage.getItem("nome") || "Usuário";
const emailUser = localStorage.getItem("email") || "Email@gmail.com";
const senhaUser = localStorage.getItem("senha") || "@@@@@@@@";
const limite = limiteSalvo ? Number(limiteSalvo) : 2000;

// === Referências aos elementos ===
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const limiteInput = document.getElementById("limite");
const editarBtn = document.getElementById("editar");
const salvarBtn = document.getElementById("salvar");
const cancelarBtn = document.getElementById("cancelar");
const excluirBtn = document.getElementById("excluir");

// === Preencher inputs ===
nomeInput.value = nomeUser;
emailInput.value = emailUser;
senhaInput.value = senhaUser;
limiteInput.value = limite;

// === Funções ===

// Ativar edição
editarBtn.addEventListener("click", () => {
  [nomeInput, emailInput, senhaInput, limiteInput].forEach(input => {
    input.readOnly = false;
  });

  editarBtn.style.display = "none";
  excluirBtn.style.display = "none";
  salvarBtn.style.display = "inline-block";
  cancelarBtn.style.display = "inline-block";
});

// Cancelar edição (volta aos valores anteriores)
cancelarBtn.addEventListener("click", () => {
  nomeInput.value = nomeUser;
  emailInput.value = emailUser;
  senhaInput.value = senhaUser;
  limiteInput.value = limite;

  [nomeInput, emailInput, senhaInput, limiteInput].forEach(input => {
    input.readOnly = true;
  });

  salvarBtn.style.display = "none";
  cancelarBtn.style.display = "none";
  editarBtn.style.display = "inline-block";
  excluirBtn.style.display = "inline-block";
});

// Salvar alterações no localStorage
salvarBtn.addEventListener("click", () => {
  localStorage.setItem("nome", nomeInput.value);
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("senha", senhaInput.value);
  localStorage.setItem("limiteUsuario", limiteInput.value);

  [nomeInput, emailInput, senhaInput, limiteInput].forEach(input => {
    input.readOnly = true;
  });

  salvarBtn.style.display = "none";
  cancelarBtn.style.display = "none";
  editarBtn.style.display = "inline-block";
  excluirBtn.style.display = "inline-block";

  Swal.fire({
    icon: "success",
    title: "Perfil atualizado!",
    text: "Suas informações foram salvas com sucesso.",
    timer: 2000,
    showConfirmButton: false
  });
});

// === Excluir conta ===
excluirBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Tem certeza?",
    text: "Esta ação vai excluir permanentemente sua conta.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      // Apagar dados do localStorage
      localStorage.clear();

      // Mostrar alerta de sucesso
      Swal.fire({
        icon: "success",
        title: "Conta excluída!",
        text: "Suas informações foram removidas com sucesso.",
        showConfirmButton: false,
        timer: 2000
      });

      // Redirecionar após um pequeno delay
      setTimeout(() => {
        window.location.href = "../index.html"; // ajuste o caminho se for diferente
      }, 2000);
    }
  });
});
