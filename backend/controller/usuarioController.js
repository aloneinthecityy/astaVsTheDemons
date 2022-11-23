const Usuario = require('../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 8;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  teste: (req, res,err) => {
    if (req.session.loggedin) {
       const idUser = req.session.user;
       console.log(idUser);
       res.render('../views/teste.ejs', { 'idUser': idUser });

        // console.log('Cookies: ', req.cookies)

    } else {
      req.session.erro = true;
      console.log('faça login antes de acessar esta página!');
      res.redirect('/login');
    }
  },

  home: (req, res) => {
    const session = req.session;
    // console.log(session)
    res.render('../views/home.ejs');
  },

  cadastro: (req, res) => {
    res.render('../views/cadastro.ejs');
  },

  insereCadastro: async (req, res) => {
    const hash = bcrypt.hashSync(req.body['password'], saltRounds);
    const resultadoCadastro = await Usuario.create({
      email: req.body['email'],
      senha: hash,
    });
    res.redirect('/login');
  },

  login: async(req, res) => {
    var mensagem;
    if (req.session.erro) {
      mensagem = req.session.mensagem;
      req.session.erro = false;
    }
    if (req.session.loggedin) {
      // let dadosBanco = await Usuario.findAll({
      //   raw: true,
      //   where: {
      //     email: req.body['email'],
      //   },
      // });
      
      // let users = {
      //   id_usuario :dadosBanco['id_usuario'],
      //   email : req.body['email'] == ['email'],
      //   password : req.body['password'] == ['senha']
      //   }
      //   res.cookie("Dados do usuário:", users);
      //   res.send('user data added to cookie');
      res.render('../views/teste.ejs', { mensagem });
    } else {
      mensagem = 'Realizar Login';
      res.render('../views/login.ejs', { mensagem });
    }
  },

  verificaLogin: async (req, res) => {
    let dadosBanco = await Usuario.findAll({
      raw: true,
      where: {
        email: req.body['email'],
      },
    });
    
    console.log('dadosBanco: ', dadosBanco)

    if (dadosBanco.length == 0)
      res.redirect('/login', { mensagem: 'Email não cadastrado' });
    else {
      let login = bcrypt.compareSync(
        req.body['password'],
        dadosBanco[0]['senha']
      );
      if (login) {
        req.session.loggedin = true;
        req.session.user = dadosBanco[0]['id_usuario']; //criando session com o id_usuario
        
        res.redirect('/teste');
      } else {
        res.redirect('/login', { mensagem: 'Erro ao realizar o login' });
      }
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => { return err });
    res.redirect('/');
  }
};


