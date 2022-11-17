const express = require('express');
const session = require('express-session');
const postgree = require('pg');
const port = 81;

const app = express();
app.use(
  session({
    secret: 'piuitictacabacaxichocolate',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const usuarioController = require('./backend/controller/usuarioController');

app.get('/', usuarioController.home);

app.get('/cadastro', usuarioController.cadastro);
app.post('/cadastro', usuarioController.insereCadastro);

app.get('/login', usuarioController.login);
app.get('/login/users', usuarioController.getUser)
app.post('/login', usuarioController.verificaLogin);

app.get('/logout', usuarioController.logout);

app.get('/jogar', usuarioController.jogar);
// app.get('/jogar/users', usuarioController.getUserId)

app.get('/teste', usuarioController.teste);

app.listen(port, () => {
  console.log(`servidor ouvindo : http://127.0.0.1:${port}`);
});

