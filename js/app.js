const button = document.getElementById('login');


async function criarConta() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const Confirmsenha = document.getElementById('senha2').value;
  const limite = document.getElementById("limite").value;

  if (nome === '' || email === '' || senha === '' || Confirmsenha === '' || limite === '') {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Por favor, preencha todos os campos corretamente.',
      confirmButtonColor: '#d33',
    });
    return;
  }

  if (Confirmsenha !== senha) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'As senhas informadas não são iguais.',
      confirmButtonColor: '#d33',
    });
    return;
  }

 
  if (nome === "fulano" && email === "Fulano.deTown@gmail.com" && senha === "12345") {
    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado!',
      text: 'Bem-vindo(a) ao OwlPlan!',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = './html/paginaInicial.html';
      localStorage.setItem("limiteUsuario", limite);
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("senha", senha);
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Erro no servidor.',
      confirmButtonColor: '#d33',
    });
  }
}


const eyeIcon = document.getElementById('eyeIcon');
let senhaVisivel = false;
eyeIcon.addEventListener('click', () => {
  const input = document.getElementById('senha');
  senhaVisivel = !senhaVisivel;
  input.type = senhaVisivel ? 'text' : 'password';
  eyeIcon.src = senhaVisivel ? './img/view.png' : './img/eye.png';
});

const eyeIcon2 = document.getElementById('eyeIcon2');
let senhaVisivel2 = false;
eyeIcon2.addEventListener('click', () => {
  const input = document.getElementById('senha2');
  senhaVisivel2 = !senhaVisivel2;
  input.type = senhaVisivel2 ? 'text' : 'password';
  eyeIcon2.src = senhaVisivel2 ? './img/view.png' : './img/eye.png';
});


const linkTrocar = document.getElementById('trocarParaLogin');
const divCadastrar = document.querySelector('.cadastrar');

if (linkTrocar) {
  linkTrocar.addEventListener('click', (event) => {
    event.preventDefault(); 

   
    divCadastrar.innerHTML = `
      <div>
        <p>Insira seu E-mail:</p>
        <input type="text" placeholder="Digite seu E-mail" id="emailLogin">
      </div>
      <div>
        <p>Insira sua Senha:</p>
        <div class="input-container">
          <input type="password" placeholder="Digite sua Senha" id="senhaLogin">
          <img src="./img/eye.png" alt="view" id="eyeLogin">
        </div>
      </div>
      <button id="btnLogin">Entrar</button>
      <p>Ainda não tem conta? <a href="#" id="voltarCadastro">Cadastre-se</a></p>
    `;

   
    document.getElementById('btnLogin').addEventListener('click', async () => {
      const email = document.getElementById('emailLogin').value;
      const senha = document.getElementById('senhaLogin').value;

      try {
        if (email === "Fulano.deTown@gmail.com" && senha === "12345") {
          Swal.fire({
            icon: 'success',
            title: 'Login realizado!',
            text: 'Você entrou com sucesso.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = './html/paginaInicial.html';
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'E-mail ou senha incorretos.',
            confirmButtonColor: '#d33',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro no servidor :(',
          confirmButtonColor: '#d33',
        });
      }
    });

   
    document.getElementById('voltarCadastro').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });

    
    const eyeLogin = document.getElementById('eyeLogin');
    let senhaVisivelLogin = false;
    eyeLogin.addEventListener('click', () => {
      const inputSenha = document.getElementById('senhaLogin');
      senhaVisivelLogin = !senhaVisivelLogin;
      inputSenha.type = senhaVisivelLogin ? 'text' : 'password';
      eyeLogin.src = senhaVisivelLogin ? './img/view.png' : './img/eye.png';
    });
  });
}
