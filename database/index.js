const Sequelize = require('sequelize')
const { database, username, dialect, host, password } = require('../config/db')

// Conexão com o banco
const conexao = new Sequelize(database, username, password, {
  dialect,
  host,
  define: {
    timestamps: true,
  },
  query: {
    raw: true,
  },
  logging: false,
})

// Envolve a conexão com o banco em um try/catch
conexao
  .sync({ force: false })
  .then(() => {
    console.log('\nBase de dados conectada.\n')
  })
  .catch((e) => {
    console.log(`\nA base de dados parou.\nErro: ${e.parent.message}`)
  })

module.exports = conexao
