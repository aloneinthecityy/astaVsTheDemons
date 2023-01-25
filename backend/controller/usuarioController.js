/* Dependências */
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');

/* 
  Isso aqui é um controller, e este código abaixo é pra configurar o express que fica no index.js
  1) Controller = é um arquivo que contém funções que são chamadas pelo index.js
  2) recomendo apagar o código abaixo
*/

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const secret = 'mysecret';
// const expiresIn = '1h';
// const pageAccess = '/home';
// const token = jwt.sign({ pageAccess }, secret, { expiresIn });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/* Models */
const Usuario = require('../../models/usuario');
const Comentarios = require('../../models/comentarios');
const SalvarEstado = require('../../models/salvar_estado');

/* Funções do controller */
module.exports = {
  jogar: async (req, res) => {
    let isAuth = req.session.loggedin;
    if (isAuth) {
      const username = req.session.username[0];
      const userId = req.session.userId;
      res.render('../views/game.ejs', { userId, isAuth, username });
    } else {
      const mensagem = 'Você precisa estar logado para jogar!';
      req.session.mensagem = mensagem;

      res.render('../views/login.ejs', { mensagem });
    }
  },

  RecebeDadosJogo: async (req, res) => {
    const itemDeserializado = req.body.itemDeserializado;
    const slot = req.body.slot;

    const estado = await SalvarEstado.findOne({
      where: { id_usuario: req.session.userId },
    });

    if (estado == null && slot == 'MyRenJSGame_slot_0') {
      await SalvarEstado.create({
        where: {
          id_usuario: req.session.userId,
        },
        id_usuario: req.session.userId,
        slot_1: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 1.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 1:', err);
        });
    } else if (slot == 'MyRenJSGame_slot_0') {
      await SalvarEstado.update(
        { slot_1: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }

    if (estado == null && slot == 'MyRenJSGame_slot_1') {
      await SalvarEstado.create({
        where: {
          id_usuario: req.session.userId,
        },
        id_usuario: req.session.userId,
        slot_1: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 1.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 1:', err);
        });
    } else if (slot == 'MyRenJSGame_slot_0') {
      await Salvar_estado.update(
        { slot_1: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }

    if (estado == null && slot == 'MyRenJSGame_slot_1') {
      await Salvar_estado.create({
        where: {
          id_usuario: req.session.userId,
        },
        id_usuario: req.session.userId,
        slot_2: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 2.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 2:', err);
        });
    } else if (slot == 'MyRenJSGame_slot_1') {
      await SalvarEstado.update(
        { slot_2: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }

    if (estado == null && slot == 'MyRenJSGame_slot_2') {
      await SalvarEstado.create({
        where: {
          id_usuario: req.session.userId,
        },
        id_usuario: req.session.userId,
        slot_3: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 3.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 3:', err);
        });
    } else if (slot == 'MyRenJSGame_slot_2') {
      await SalvarEstado.update(
        { slot_3: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }

    if (estado == null && slot == 'MyRenJSGame_slot_2') {
      await Salvar_estado.create({
        where: {
          id_usuario: req.session.userId,
        },
        id_usuario: req.session.userId,
        slot_3: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 3.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 3:', err);
        });
    } else if (slot == 'MyRenJSGame_slot_2') {
      await Salvar_estado.update(
        { slot_3: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }
    res.send(estado);
  },

  carregaDadosJogo: async (req, res) => {
    let dadosBanco = await SalvarEstado.findAll({
      raw: true,
      where: {
        id_usuario: req.session.userId,
      },
    });
    console.log('Carregamento dos dados: ', dadosBanco);
    res.send(JSON.stringify(dadosBanco));
  },

  RetornaDadosJogo: async (req, res) => {
    let dadosBanco = await SalvarEstado.findAll({
      raw: true,
      where: {
        id_usuario: req.session.userId,
      },
    });

    console.log('Retorno dos dados:', dadosBanco);
    res.send(dadosBanco);
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

  forum: async (req, res) => {
    let isAuth = req.session.loggedin;

    try {
      if (isAuth) {
        const username = req.session.username[0];

        let comentarios = await Comentarios.findAll({
          raw: true,
          order: [['updatedAt', 'DESC']],
        });

        res.render('../views/forum.ejs', {
          user: username,
          comentarios: comentarios,
        });
      } else {
        const mensagem = 'Você precisa estar logado para acessar essa página!';
        req.session.mensagem = mensagem;
        res.render('../views/login.ejs', { mensagem });
      }
    } catch (err) {
      console.log(err);
    }
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
    const { email, password } = req.body;
    let user = await Usuario.findOne({ where: { email } });

    const hash = bcrypt.hashSync(password, saltRounds);

    if (password.length < 8) {
      req.session.mensagem = 'Digite uma senha com no mínimo 8 caracteres.';
      res.redirect('/cadastro');
    } else {
      if (user) {
        req.session.mensagem = 'Conta já cadastrada!';
        res.redirect('/cadastro');
      } else {
        await Usuario.create({
          email,
          senha: hash,
        });
        console.log('Usuário cadastrado com sucesso!');
        res.redirect('/teste');
      }
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

        const { email } = req.body;
        const username = email.split('@');
        req.session.username = username; // username ficticio com o inicio do email

        console.log('Seja bem vindo', username[0], '!'); //aqui printa o nome ficticio do usuario no console!

        res.redirect('/teste');
      } else {
        req.session.mensagem = 'Senha incorreta';
        res.redirect('/login');
      }
    }
  },

  recuperarSenhaGet: (req, res) => {
    res.render('../views/recuperarSenha.ejs');
  },

  recuperarSenhaPost: (req, res) => {
    const email = req.body.email;

    let usuario = Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (usuario != 0) {
      const secret = 'mysecret';

      const resetToken = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        secret,
        {
          expiresIn: '15m',
        }
      );

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          accessToken: 'aedplsduoldgqwpq',
          user: 'astavsthedemons@gmail.com',
          pass: 'aedplsduoldgqwpq',
        },
      });

      const encodedToken = Buffer.from(resetToken).toString('base64');
      const encodedUrl = encodeURIComponent(encodedToken);
      const resetUrl = `http://localhost:81/resetPassword/${usuario.id_usuario}/${encodedUrl}`;

      const ejs = require('ejs');
      const accessLink = `http://localhost:3000/verify?token=${resetUrl}`;
      const html = ejs.render(
        `<a href="<%= accessLink %>"> Altere sua senha aqui :) </a>`,
        { accessLink }
      );

      let mailOptions = {
        from: 'astavsthedemons@gmail.com',
        to: email,
        subject: 'Recuperação de senha - AstavsTheDemons',
        html,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const mensagemEnvio = 'Email enviado! Verifique sua caixa de entrada ;)';
      res.render('../views/recuperarSenha.ejs', { mensagem: mensagemEnvio });
    } else {
      const mensagemErro = 'Email incorreto ou não cadastrado!';
      res.render('../views/recuperarSenha.ejs', { mensagem: mensagemErro });
    }
  },

  verify: (req, res) => {
    const secret = 'mysecret';
    const token = req.query.token;
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.pageAccess) {
        res.render(decoded.pageAccess);
      }
    } catch (err) {
      res.status(401).send('Token inválido ou expirado');
    }
  },

  insereComentario: (req, res) => {
    const comentario = req.body.comentario;
    const checkbox = req.body.checkbox;

    if (checkbox == 'on') {
      const id_usuario = req.session.userId;
      const usuario = 'Anônimo';

      console.log('o toggle está selecionado');
      Comentarios.create({
        id_usuario,
        usuario,
        comentario,
      }).then(() => {
        res.status(201).redirect('/forum');
      });
    } else {
      const username = req.session.username[0];
      const id_usuario = req.session.userId;

      Comentarios.create({
        id_usuario,
        usuario: username,
        comentario,
      }).then(() => {
        res.status(201).redirect('/forum');
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      return err;
    });
    res.redirect('/login');
  },
};
