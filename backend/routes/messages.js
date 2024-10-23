var express = require('express');
var verifyToken = require('./verifier')
var router = express.Router();

const Message = require('../models/message');
var User = require('../models/user');


// POST '/get' -> gambiarra!!!!
// mudei para post porque o get era bloqueado pelo CORS por causa do JWT
router.post('/get', verifyToken, async function (req, res, next) {
  let user = req.user;
  console.log(user);
  try{
    const messageFindTodos = await Message.find({})
      .populate({
        path: 'user',
        select: '-password -email',
      }).exec();

    res.status(200).json({
      myMsgSucesso : "Mensagens recuperadas do BD com sucesso!",
      objSMessageSRecuperadoS : messageFindTodos
    });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      myErrorTitle : "Serve-Side: Um erro aconteceu ao buscar as MensagenS",
      myErro : err
    });
  }
});

router.post('/', verifyToken, async function (req, res, next) {
  let user = req.user;

  const messageObject = new Message({
    content: req.body.message.content,
    user: user.id,
  });

  console.log(messageObject);

  try{
    let messageSave = await messageObject.save();
    // gambiarra!!!
    let u = await User.findById(user.id);
    messageSave.username = u.username;
    console.log(messageSave, u);

    res.status(201).json({
      myMsgSucesso: "Menssagem salva com sucesso",
      objMessageSave: messageSave,
      user: u,
    });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      myErrorTitle : "Serve-Side: Um erro aconteceu ao salvar a mensagem",
      myError : err
    });
  }

});

module.exports = router;
