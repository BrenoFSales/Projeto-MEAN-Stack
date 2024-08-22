// Codigo asseguir é o sugerido pelo proprio MongoDB Atlas:

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SalesMEAN:bzo1Btsc8tnpFMUx@mean.z952y.mongodb.net/?retryWrites=true&w=majority&appName=MEAN";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("myDataBase").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Acessa o banco de dados
    const db = client.db("myDataBase");
    
    // Acessa a colecao 
    const colecao = db.collection("teste");
    
    // Faz uma consulta para encontrar todos os documentos na colecao
    const resultConsulta = await colecao.find({}).toArray();
    
    
    // Exibe os resultados no console
    console.log(resultConsulta);
    
    // Cria uma nova colecao chamada "minhaColecao"
    // const collection = database.collection("minhaColecao");
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

// Exportando a funcao run() para ser chamada no app.js 
module.exports = { run };
