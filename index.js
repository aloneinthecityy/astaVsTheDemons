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

// (async () => {
//   const database = require('./backend/config/db');
//   try {
//     const resultado = await database.sync();
//     // console.log(resultado);
//   } catch (error) {
//     console.log(error);
//   }
// })();

const usuarioController = require('./backend/controller/usuarioController');

app.get('/', usuarioController.home);

app.get('/cadastro', usuarioController.cadastro);
app.post('/cadastro', usuarioController.insereCadastro);

app.get('/login', usuarioController.login);
app.post('/login', usuarioController.verificaLogin);

app.get('/logout', usuarioController.logout);

app.get('/jogar', usuarioController.jogar);

app.get('/teste', usuarioController.teste);

app.get('/user/:id', usuarioController.pegarUsuarioId);

app.listen(port, () => {
  console.log(`servidor ouvindo : http://127.0.0.1:${port}`);
});

// app.post('/login', UrlendcodedParser, (req, res) => {
//   const { email, password } = req.body;

//   var query = 'SELECT senha FROM usuario where email = $1';

//   console.log(email, password);

//   if (email && password) {
//     pool.query(query, [email], (err, result) => {
//       if (err) throw err;

//       if (result.rowCount) {
//         bcrypt.compare(password, result.rows[0].senha, (err, resultado) => {
//           if (err) throw err;
//           if (resultado) {
//             req.session.loggedin = true;
//             req.session.username = result.rows[0].nomeusuario;
//             res.redirect('/');
//           } else {
//             res.render('login.ejs', {
//               error: true,
//               message: 'Usuário ou senha incorreto',
//             });
//           }
//         });
//       }
//     });
//   } else {
//     res.render('login.ejs', {
//       error: true,
//       message: 'Digite o nome de usuário e senha!',
//     });
//   }
// });
