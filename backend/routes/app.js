var express = require('express'); 
var router = express.Router();
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

router.use(express.json());

// Rota que renderiza o Index ao carregar o server
router.get('/', (req, res, next) => {
  res.render('index');
});

// A variavel "User" permite importar o nosso modelo. Ela representa o nosso modelo de usuario
var User = require('../models/user');

router.post('/save-message', async (req, res, next) => {
  console.log('enviado!');
  let {username, content} = req.body.message;
  let query = await User.findOne({username: username}).exec();
  console.log(query);
});


// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = decoded;
    next();
  });
};

router.post("/signup", bodyParser.urlencoded({extended: true}), async (req, res, next) => {
  let { firstNameTS, lastNameTS, emailTS, passwordTS } = req.body;

  let newUser = new User({
    username: `${firstNameTS} ${lastNameTS}`,
    email: emailTS,
    password: passwordTS,
  })
  await newUser.save();

  console.log('usuário cadastrado! ', newUser.username);
  res.send(200);
});

router.post("/signin", bodyParser.urlencoded({extended: true}), async (req, res, next) => {
  let { emailTS = 'default', passwordTS = 'default' } = req.body;
  
  try {

    let query = await User.findOne({email: emailTS, password: passwordTS}).exec();
    if (query === null) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = jwt.sign({email: query.email}, 'secret');

    res.cookie('JWT', token).send({jwt: token});
    return;

  } catch (err) {
    res.sendStatus(500);
    return;
  };
});

router.get('/node-mongodb-mongoose-user', async (req, res, next) => {
  //res.render('node');
  try {
    const userFind = await User.findOne({});
    res.render('node', {
      firstNameV: userFind.firstName,
      lastNameV: userFind.lastName,
      passwordV: userFind.password,
      emailV: userFind.email,
      messagesV: userFind.messages
    });
  } catch(err) {
    return res.send('Error!!!');
  }
});

/*

*/

router.post('/node-mongodb-mongoose-user', async (req, res, next) => {
  var emailVar = req.body.emailBody;
  var userObject = new User ({
    firstName: 'Breno',
    lastName: 'Sales',
    password: 'Segredo',
    email: emailVar
  });
  await userObject.save();

  res.redirect('/node-mongodb-mongoose-user');
});


module.exports = router; 


