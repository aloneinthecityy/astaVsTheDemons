const Usuario = require('../models/usuario');
const bcrypt = require("bcrypt");
const saltRounds = 8;
const postgree = require('pg');
const { Pool } = postgree;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'astavsthedemons',
    password: 'admin',
    port: 5432,
  });
  

module.exports ={
    jogar: (req,res)=>{
        var mensagem;
        if (req.session.erro){
            mensagem = req.session.mensagem;
            req.session.erro=false;
        }
        if(req.session.loggedin){
            res.render('../views/game.ejs', {mensagem: mensagem});

        }
        else{
            mensagem = "Realizar Login";
            res.render('../views/login.ejs', {mensagem: mensagem});

        }
    },
    teste: (req,res)=>{
        if (req.session.loggedin) {
            res.render("../views/teste.ejs");
        }
        else {
            req.session.erro=true;
            console.log("faça login antes de acessar esta página!");
            res.redirect("/login");
        } 
    },
    home: (req,res)=>{
        res.render('../views/home.ejs');
    },
    cadastro: (req, res) =>{
        res.render('../views/cadastro.ejs');
    },
  
    insereCadastro: async function(req, res) {   
        const hash = bcrypt.hashSync(req.body['password'], saltRounds);
        const resultadoCadastro = await Usuario.create({
            email: req.body['email'],
            senha: hash
        })
        console.log(resultadoCadastro)
        res.redirect('/login');
    },
    login: (req, res) =>{
        var mensagem;
        if (req.session.erro){
            mensagem = req.session.mensagem;
            req.session.erro=false;
        }
        if(req.session.loggedin){
            res.render('../views/teste.ejs', {mensagem: mensagem});
        }
        else{
            mensagem = "Realizar Login";
            res.render('../views/login.ejs', {mensagem: mensagem});

        }
    },
    verificaLogin: async (req, res)=> {  
        let dadosBanco = await Usuario.findAll({
            raw: true,
            where: {
              email: req.body['email']
            }
          });
        if(dadosBanco.length==0)
            res.redirect('/login', {mensagem: "Email não cadastrado"})
        else{
            
            let login=bcrypt.compareSync(req.body['password'], dadosBanco[0]['senha']);
            if(login){
                req.session.loggedin = true;
                req.session.username = dadosBanco[0]['email'];
                res.redirect('/teste');
                
            }
            else { 
                res.redirect('/login', {mensagem: "Erro ao realizar o login"});
            }
        }
    },
    logout: (req,res) => {
        req.session.destroy((err)=>{

        })
        res.redirect('/');
    },
}