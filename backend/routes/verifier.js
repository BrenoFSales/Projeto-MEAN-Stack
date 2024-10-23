const jwt = require('jsonwebtoken');

// conteudo salvo no JWT:
// {id: query.id, username: query.username}

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.body.jwt ?? req.headers['authorization'];
  console.log('token:', token, req.body, req.headers['authorization']);
  if (!token) {
    console.log('unauthorized: no token.')
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      console.log('unauthorized: wrong token.')
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
