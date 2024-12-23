var express = require('express');
var router = express.Router();
const userModel = require("./users");
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.ban = true 
  res.cookie("cookies","ParleG" );// cookie created
  res.render("index");
});
// check the cookie in console value ,type cookie to get specific data like parleG
router.get("/cookieread", function (req,res){
  console.log(req.cookies.cookies);
  res.send("check")
 
})
router.get("/delread", function (req,res){
  // console.log(req.cookies.age);
  res.clearCookie("cookies");
 res.send("clear ho gya bhiidu")
})

// check cookie working as it is banned or not
router.get("/check",function(req,res){
  console.log(req.session);
  if (req.session.ban === true){
    res.send("u r banned my boy")
  }
  else{res.send("u removed it")}
})
router.get("/removeban",function(req,res){
  req.session.destroy(function(err){

    if (err) throw err;
    res.send("unbanned");
  })
})
// mongo CRUD operrations
router.get("/create",  async function(req, res, next) {
  const createduser = await userModel.create({
    username: "rsp",
    age: 19,
    name: "roshan"
  });

  res.send(createduser);

});
router.get("/read", async function (req,res){
  console.log(req.cookies);
  res.send("check")
  let allusers = await userModel.findOne()
  res.send(allusers)
})
router.get("/delete",async function (req,res){
  let deleteuser = await userModel.findOneAndDelete({
    username: "rsp"
  })
  res.send(deleteuser)
})


module.exports = router;
