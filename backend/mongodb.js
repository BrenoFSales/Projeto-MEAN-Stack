const mongoose = require('mongoose');

const uri = "mongodb+srv://SalesMEAN:bzo1Btsc8tnpFMUx@mean.z952y.mongodb.net/?retryWrites=true&w=majority&appName=MEAN";
// const uri = "mongodb://balta:e296cd9f@localhost:27017/admin";

// Conectando ao MongoDB Atlas com Mongoose
mongoose.connect(uri, {
  dbName: "myDataBase",
  authSource: "admin",
}).then(async () => {
  console.log("Conectado ao MongoDB Atlas com Mongoose!!!");

  // Acessa o banco de dados através do Mongoose
  // const mydbMongoose = mongoose.connection.db;
  
  // Acessa a coleção "teste"
  // const colecao = mydbMongoose.collection("teste");

  // Faz uma consulta para encontrar todos os documentos na coleção
  // const resultConsulta = await colecao.find({}).toArray();

  // Exibe os resultados no console
  // console.log(resultConsulta);
  
}).catch(err => {
  console.error("Erro ao conectar ao MongoDB (;-;):", err);
});

// Exportando a conexão para ser usada em outros arquivos
module.exports = mongoose;
