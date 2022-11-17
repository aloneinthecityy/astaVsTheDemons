const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'astavsthedemons',
//   password: 'admin',
//   port: 5432,
// });


// client.connect((err, res) => {
//   if (err) throw err;
//   console.log('Conectado');
// });

module.exports = {
  jogar: (req, res) => {
    let mensagem;
    if (req.session.erro) {
      mensagem = req.session.mensagem;
      req.session.erro = false;
    }
    if (req.session.loggedin) {
      res.render('../views/game.ejs', { mensagem });
    } else {
      mensagem = 'Realizar Login';
      res.render('../views/login.ejs', { mensagem });
    }
  },

  teste: (req, res) => {
    if (req.session.loggedin) {
      res.render('../views/teste.ejs');
    } else {
      req.session.erro = true;
      console.log('faça login antes de acessar esta página!');
      res.redirect('/login');
    }
  },

  home: (req, res) => {
    res.render('../views/home.ejs');
  },

  cadastro: (req, res) => {
    res.render('../views/cadastro.ejs');
  },

  insereCadastro: async function (req, res) {
    const hash = bcrypt.hashSync(req.body['password'], saltRounds);
    const resultadoCadastro = await Usuario.create({
      email: req.body['email'],
      senha: hash,
    });
    console.log(resultadoCadastro);
    res.redirect('/login');
  },

  login: (req, res) => {
    var mensagem;
    if (req.session.erro) {
      mensagem = req.session.mensagem;
      req.session.erro = false;
    }
    if (req.session.loggedin) {
      res.render('../views/teste.ejs', { mensagem: mensagem });
    } else {
      mensagem = 'Realizar Login';
      res.render('../views/login.ejs', { mensagem: mensagem });
    }
  },

  verificaLogin: async (req, res) => {
    const { email } = req.body;
    let dadosBanco = await Usuario.findAll({
      raw: true,
      where: {
        email: req.body['email'],
      },
    });
    if (dadosBanco.length == 0)
      res.redirect('/login', { mensagem: 'Email não cadastrado' });
    else {
      let login = bcrypt.compareSync(
        req.body['password'],
        dadosBanco[0]['senha']
      );
      if (login) {
        req.session.loggedin = true;
        req.session.username = dadosBanco[0]['email'];
        res.redirect('/teste');
      } else {
        res.redirect('/login', { mensagem: 'Erro ao realizar o login' });
      }
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {});
    res.redirect('/');
  },

 
  getUser: async (req, res, userId) => {
      const usuario = await Usuario.findAll({
        attributes: ['id_usuario'],
      });
      return res.json(usuario);
  },

  //     // const email = req.body.email;
  //     // client.connect()
  //     // // const teste = client.query('SELECT email FROM usuarios where email = $1', [email]).then(result => console.log(result)).catch(e => console.error(e.stack)).then(() => client.end())
  //     // var data = req.body;
  //     // console.log("email:" + data.email);
  //     // res.send();
  //     // const query = {
  //     //   name: 'fetch-user',
  //     //   text: 'SELECT id_usuario FROM usuarios WHERE email = $1',
  //     //   values: [email]
  //     // }

  //     // client.connect()
  //     // const teste = client.query('SELECT $1::text as email',[email]).then(result => console.log(result)).catch(e => console.error(e.stack)).then(() => client.end())
  //     // return res.json(amor);
  //   }
  // },
};
