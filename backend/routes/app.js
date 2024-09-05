var express = require('express'); 
var router = express.Router();

// Rota que renderiza o Index ao carregar o server
router.get('/', (req, res, next) => {
    res.render('index');
});

// A variavel "User" permite importar o nosso modelo. Ela representa o nosso modelo de usuario
var User = require('../models/user');

router.get('/node-mongodb-mongoose-user', async (req, res, next) => {
  //res.render('node');
  try {
    const userFind = await User.findOne({});
    res.render('node', {  firstNameV: userFind.firstName,
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

 