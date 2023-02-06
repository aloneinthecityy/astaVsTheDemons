const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 81;
const bodyParser = require('body-parser');

/* Configurações do express */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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


/* Controller */
const usuarioController = require('./backend/controller/usuarioController');

/* Rotas */
app.get('/', usuarioController.home);

app.get('/cadastro', usuarioController.cadastro);
app.post('/cadastro', usuarioController.insereCadastro);

app.get('/login', usuarioController.login);
app.post('/login', usuarioController.verificaLogin);

app.get('/recuperarSenha', usuarioController.recuperarSenhaGet);
app.post('/recuperarSenha', usuarioController.recuperarSenhaPost);

app.get('/verify', usuarioController.verify);

app.get('/logout', usuarioController.logout);

app.get('/jogar', usuarioController.jogar);

app.get('/forum', usuarioController.forum);
app.post('/insereComentario', usuarioController.insereComentario);

app.get('/respostas/:id', usuarioController.respostas);
app.post('/insereResposta', usuarioController.insereRespostas);



app.post('/recebedados', usuarioController.RecebeDadosJogo);
app.post('/carregaDados', usuarioController.carregaDadosJogo);
app.post('/retornaDados', usuarioController.RetornaDadosJogo);

app.get('/teste', usuarioController.teste);

app.get('/blog', usuarioController.blog);

app.get('/*', (req, res) => {
  res.status(404).render('404.ejs');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`servidor ouvindo : http://127.0.0.1:${port}`);
});
