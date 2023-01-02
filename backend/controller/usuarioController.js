const Usuario = require('../../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 8;

const bodyParser = require('body-parser');
// const sequelize = require('../../config/db');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('astavsthedemons', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Salvar_estado = sequelize.define('salvar_estado', {
  id_usuario: { type: Sequelize.INTEGER },
  slot_1: { type: Sequelize.JSON },
  slot_2: { type: Sequelize.JSON },
  slot_3: { type: Sequelize.JSON },
});

module.exports = {
  jogar: async(req, res) => {
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

    const estado = await Salvar_estado.findOne({
      where: { id_usuario: req.session.userId }
    });

    if (estado == null && slot == "MyRenJSGame_slot_0") {

      await Salvar_estado.create({
      where: {
        id_usuario: req.session.userId,
      },
      id_usuario: req.session.userId,
      slot_1: itemDeserializado,
    }).then(() => {
      console.log('Registro adicionado com sucesso NO SLOT 1.');      
    }).catch(err => {
      console.error('Falha ao adicionar registro NO SLOT 1:', err);
    });

  } else if (slot == "MyRenJSGame_slot_0") {
    await Salvar_estado.update(
    { slot_1: itemDeserializado },
    { where: { id_usuario: req.session.userId } }
    );
    }
  

      if (estado == null && slot == "MyRenJSGame_slot_1") {

          await Salvar_estado.create({
          where: {
            id_usuario: req.session.userId,
          },
          id_usuario: req.session.userId,
          slot_2: itemDeserializado,
        }).then(() => {
          console.log('Registro adicionado com sucesso NO SLOT 2.');      
        }).catch(err => {
          console.error('Falha ao adicionar registro NO SLOT 2:', err);
        });
      
      }
      else if (slot == "MyRenJSGame_slot_1") {
        await Salvar_estado.update(
        { slot_2: itemDeserializado },
        { where: { id_usuario: req.session.userId } }
        );
        }
   

   if (estado == null && slot == "MyRenJSGame_slot_2") {

      await Salvar_estado.create({
      where: {
        id_usuario: req.session.userId,
      },
      id_usuario: req.session.userId,
      slot_3: itemDeserializado,
    }).then(() => {
      console.log('Registro adicionado com sucesso NO SLOT 3.');      
    }).catch(err => {
      console.error('Falha ao adicionar registro NO SLOT 3:', err);
    });
  
  }
    else if (slot == "MyRenJSGame_slot_2") {
      await Salvar_estado.update(
      { slot_3: itemDeserializado },
      { where: { id_usuario: req.session.userId } }
      );
      }
      res.send(estado);
  },

  carregaDadosJogo: async (req, res) => {
    let dadosBanco = await Salvar_estado.findAll({
      raw: true,
      where: {
        id_usuario: req.session.userId,
      },
    });
    console.log('Carregamento dos dados: ',dadosBanco);
    res.send(JSON.stringify(dadosBanco));
  },

  RetornaDadosJogo: async (req, res) => {
    const slot = req.body.slot;
    
    let dadosBanco = await Salvar_estado.findAll({
      raw: true,
      where: {
        id_usuario: req.session.userId,
      },
    });

    console.log('Retorno dos dados:',dadosBanco);
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

        console.log("Seja bem vindo",username[0], "!"); //aqui printa o nome ficticio do usuario no console!

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
    res.redirect('/login');
  },
};
