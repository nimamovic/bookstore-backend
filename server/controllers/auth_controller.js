const { User } = require('../models')
const jwt = require('jsonwebtoken');
const tokenenv = "" + process.env.TOKEN;

const postLogin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) 
    res.json({
      ok: false,
      message: 'Login not successful'
    });
  const filtters = {email: req.body.email, password:req.body.password};
  try{
    const user = await User.findOne(filtters);
      if(user){
        const token = jwt.sign({ id: user.id }, tokenenv, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({token});
      }
      else res.json({
              ok: false,
              message: 'Login not successful',
          });
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}

module.exports = {
  postLogin
}