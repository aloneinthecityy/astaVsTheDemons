function save() {
  console.log('Function save() chamada');
}

function getUserId() {
  const userId = document.getElementById('userId').value;
  const isAuth = document.getElementById('isAuth').value;
  console.log('userId: ', userId);
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

save();
getUserId();
