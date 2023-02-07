const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');

/* Tabelas */
const Usuario = require('../../models/usuario');
const Comentarios = require('../../models/comentarios');
const Respostas = require('../../models/respostas');
const SalvarEstado = require('../../models/salvar_estado');

/* Jwt secret */
const jwtSecret = 'somesecret'

/* Funções da aplicação */
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
    } else if (estado != null && slot == 'MyRenJSGame_slot_0') {
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
        slot_2: itemDeserializado,
      })
        .then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 2.');
        })
        .catch((err) => {
          console.error('Falha ao adicionar registro NO SLOT 2:', err);
        });
    } else if (estado != null && slot == 'MyRenJSGame_slot_1') {
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
    } else if (estado != null && slot == 'MyRenJSGame_slot_2') {
      await SalvarEstado.update(
        { slot_3: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
      );
    }
    res.send(estado);
  },

  carregaDadosJogo: async (req, res) => {
    try {
      console.log('userID: ', req.session.userId)
      let dadosBanco = await SalvarEstado.findAll({
        raw: true,
        where: {
          id_usuario: req.session.userId,
        },
      });
      console.log('Carregamento dos dados: ', dadosBanco);
      res.send(JSON.stringify(dadosBanco));
    } catch (err) {
      console.log(err);
    }
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

  home: (req, res) => {
    if (req.session.loggedin) {
      res.render('../views/home.ejs');
    } else {
      req.session.erro = true;
      console.log('faça login antes de acessar esta página!');
      res.redirect('/login');
    }
  },

  index: (req, res) => {
    res.render('../views/index.ejs');
  },

  forum: async (req, res) => {
    let isAuth = req.session.loggedin;

    try {
      if (isAuth) {
        const username = req.session.username[0];

        const comentarios = await Comentarios.findAll({
          raw: true,
          order: [['updatedAt', 'DESC']],
        });

        const respostas = await Respostas.findAll({
          raw: true,
          order: [['updatedAt', 'DESC']],
        });

        res.render('../views/forum.ejs', {
          user: username,
          comentarios: comentarios,
          respostas: respostas,
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
        const usuarioCriado = await Usuario.create({
          email,
          senha: hash,
        });

        if (!usuarioCriado) {
          req.session.mensagem = 'Não foi possível criar a conta. Tente novamente.';
          res.redirect('/cadastro');
        }

        res.redirect('/login');
      }
    }
  },

  login: async (req, res) => {
    const mensagem = req.session.mensagem;
    delete req.session.mensagem;

    res.render('../views/login.ejs', { mensagem });
  },

  verificaLogin: async (req, res) => {
    const { email, password } = req.body;

    let dadosBanco = await Usuario.findAll({
      raw: true,
      where: {
        email
      },
    });

    if (dadosBanco.length == 0) {
      req.session.mensagem = 'E-mail incorreto ou não cadastrado';
      res.redirect('/login');
    } else {
      const mesmaSenha = bcrypt.compareSync(
        password,
        dadosBanco[0].senha
      );

      if (!mesmaSenha) {
        req.session.mensagem = 'Senha incorreta';
        res.redirect('/login');
      } else {
        req.session.loggedin = true;
        req.session.userId = dadosBanco[0]['id_usuario']; //criando session com o id_usuario do banco de dados

        const username = email.split('@');
        req.session.username = username; // username ficticio com o inicio do email

        console.log('Seja bem vindo,', username[0], '!'); //aqui printa o nome ficticio do usuario no console!

        res.redirect('/home');
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

      const resetToken = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        jwtSecret,
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
    const token = req.query.token;
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (decoded.pageAccess) {
        res.render(decoded.pageAccess);
      }
    } catch (err) {
      res.status(401).send('Token inválido ou expirado');
    }
  },

  insereComentario: (req, res) => {
    const userId = req.session.userId;
    const comentario = req.body.comentario;
    const checkbox = req.body.checkbox;
    const usuario = checkbox === 'on' ? 'Anônimo' : req.session.username[0];

    Comentarios.create({
      id_comentario: null,
      id_usuario: userId,
      usuario,
      comentario,
    }).then((comentarioCriado) => {
      res.status(201).redirect('/forum');
      console.log('Comentário criado com sucesso!')
      console.log(comentarioCriado.dataValues)
    });
  },

  insereResposta: async (req, res) => {
    try {
      const id_comentario = req.body.id_comentario;
      const userId = req.session.userId;
      const comentario = req.body.comentario;
      const checkbox = req.body.checkbox;
      const usuario = checkbox === 'on' ? 'Anônimo' : req.session.username[0];

      console.log(id_comentario, userId, comentario, usuario)

      if (id_comentario == null) {
        res.redirect('/forum');
      } else {
        Respostas.create({
          id_respostas: null,
          id_usuario: userId,
          id_comentario: id_comentario,
          usuario,
          comentario,
        }).then((respostaCriada) => {
          res.status(201).redirect('/forum');
          console.log('Resposta criada com sucesso!')
          console.log(respostaCriada.dataValues)
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      return err;
    });
    res.redirect('/login');
  },
};
