const Usuario = require('../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 8;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
  jogar: (req, res) => {
    let isAuth = req.session.loggedin;

    if (isAuth) {
      const username = req.session.username;
      const userId = req.session.userId;
      res.render('../views/game.ejs', { userId, isAuth, username });
    } else {
      const mensagem = 'Você precisa estar logado para jogar!';
      req.session.mensagem = mensagem;

      res.render('../views/login.ejs', { mensagem });
    }
  },

  teste: (req, res, err) => {
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

  blog: (req, res) => {
    res.render('../views/blog.ejs');
  },

  cadastro: (req, res) => {
    const mensagem = req.session.mensagem;
    delete req.session.mensagem;

    res.render('../views/cadastro.ejs', { mensagem });
  },

  insereCadastro: async (req, res) => {
    const hash = bcrypt.hashSync(req.body['password'], saltRounds);
    const resultadoCadastro = await Usuario.create({
      email: req.body['email'],
      senha: hash,
    });

    if (!resultadoCadastro) {
      req.session.mensagem = 'Erro ao cadastrar usuário';
      res.redirect('/cadastro');
    } else {
      res.redirect('/');
    }
  },

  login: async (req, res) => {
    const mensagem = req.session.mensagem;
    delete req.session.mensagem;

    res.render('../views/login.ejs', { mensagem });
  },

  verificaLogin: async (req, res) => {
    let dadosBanco = await Usuario.findAll({
      raw: true,
      where: {
        email: req.body['email'],
      },
    });

    console.log('dadosBanco: ', dadosBanco);

    if (dadosBanco.length == 0) {
      req.session.mensagem = 'E-mail incorreto ou não cadastrado';
      res.redirect('/login');
    } else {
      let login = bcrypt.compareSync(
        req.body['password'],
        dadosBanco[0]['senha']
      );
      if (login) {
        req.session.loggedin = true;
        req.session.userId = dadosBanco[0]['id_usuario']; //criando session com o id_usuario
        // req.session.username = dadosBanco[0]['email']; //criando session com o email
        // ! OBSERVAÇÃO: dá pra criar um username ficticio com o inicio do email

        res.redirect('/teste');
      } else {
        req.session.mensagem = 'Senha incorreta';
        res.redirect('/login');
      }
    }
  },

  /* Dica de simplificação do verificaLogin */
  login_post: async (req, res) => {
    const { email, password } = req.body;

    const user = await Usuario.findOne({
      raw: true,
      where: {
        email,
      },
    });

    if (!user) {
      req.session.error = 'Dados informados não conferem';
      return res.redirect('/login');
    }

    const isMatch = bcrypt.compare(password, user.senha);

    if (!isMatch) {
      req.session.error = 'Dados informados não conferem';
      return res.redirect('/login');
    }

    req.session.loggedin = true;
    req.session.userId = user.id_usuario;
    res.redirect('/');
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      return err;
    });
    res.redirect('/');
  },
};
