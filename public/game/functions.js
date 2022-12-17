function save() {
  console.log("Olá, a function 'save()' foi chamada com sucesso!");
}

function getUserId() {
  const userId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const isAuth = document.getElementById('isAuth').value;

  console.log('userId: ', userId);
  console.log('username: ', username);
  console.log('isAuth: ', isAuth);

  /* 
    1) Se o usuário estiver logado, salva e retorna o userId
    2) Se não estiver autenticado, remove o userId do localStorage
  */
  if (isAuth) {
    localStorage.setItem('userId', userId);
    console.log('userId salvo no localStorage');
  } else {
    localStorage.removeItem('userId');
    console.log('userId removido do localStorage');
  }

  return userId;
}

const item = localStorage.getItem("RenJSDATAQuickstart0"); //ATÉ O MOMENTO SÓ PEGUEI UM SLOT, JÁ ESTOU TRABALHANDO PARA INSERIR OS OUTROS. Estava testando se ia dar certo.
const itemDeserializado = JSON.parse(item);


const xhr = new XMLHttpRequest();
xhr.open('POST', '/recebedados');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(itemDeserializado));



save();
getUserId();



