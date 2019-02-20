const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {

  jwt.verify(req.headers.authorization, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthenticated'
      })
    }
    req.userData = decoded
    next()
  })

}
