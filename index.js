const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const { LocalStorage } = require("node-localstorage");
const port = 81;

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: 'piuitictac33bac2343547t23903832jkkk11832pouir',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');


var localStorage = new LocalStorage('./scratch'); 
// console.log(localStorage.getItem('userId'))


const usuarioController = require('./backend/controller/usuarioController');

app.get('/', usuarioController.home);

app.get('/cadastro', usuarioController.cadastro);
app.post('/cadastro', usuarioController.insereCadastro);

app.get('/login', usuarioController.login);
app.post('/login', usuarioController.verificaLogin);

app.get('/logout', usuarioController.logout);

app.get('/jogar', usuarioController.jogar);

app.get('/teste', usuarioController.teste);

app.listen(port, () => {
  console.log(`servidor ouvindo : http://127.0.0.1:${port}`);
});

