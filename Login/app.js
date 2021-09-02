const express = require("express");
const bodyParser = require("body-parser");
const path = require ("path");

const User = require("./model/user");
const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
const JWT_SECRET  = 'bdieu2gf8q3fqegrp97qegfpqiwgfuepiqergqdlsfgipqergpqe'

mongoose.connect('mongodb://localhost:27017/customersDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


const app = express();
app.use(express.static("Login/public"));
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json());

/*
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});
app.get("/login", function(req,res){
  res.sendFile(__dirname + "/login.html")
});
app.get("/change_password", function(req,res){
  res.sendFile(__dirname + "/change_password.html")
});
*/

app.post("/api/change_password", async (req, res)  => {
  const {token, newpassword: plainTextPassword} = req.body

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({status: "error", error: "Invalid Password"})
  }

  if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

  try {
    const user = jwt.verify(token, JWT_SECRET)

    const _id = user.id

    const password = await bcrypt.hash(plainTextPassword, 10)

    await User.updateOne(
      {_id},
      {
        $set: {password}
      }
    )
    res.json({status: "ok"})
  } catch (error){
    console.log(error)
    res.json({status: "error", error: ";))"})
  }

  console.log ("JWT decoded:", user)
  res.json({ status: "ok"})
})

app.post("/api/login", async (req, res) => {
  const {username,password} = req.body

  const user = await User.findOne ({username}).lean()

  if (!user){
    return res.json({ status: "error", error: "Invalid username/password"})
  }

  if (await bcrypt.compare(password, user.password)){
      //if the username, password combination is successful
      const token = jwt.sign ({
        id: user._id,
        username: user.username
      }, JWT_SECRET)

      return res.json({ status: "ok", data: token})
  }
  res.json({status: "error", error: "Invalid username/password"})

})

app.post("/api/register", async (req,res) => {
  const {username, password: plainTextPassword} = req.body

  if (!username || typeof username !==  "string"){
    return res.json({status: "error", error: "Invalid username"})
  }

  if (!plainTextPassword || typeof plainTextPassword !==  "string"){
    return res.json({status: "error", error: "Invalid password"})
  }

  if (plainTextPassword.length < 5) {
      return res.json({status: "error", error: "Password is too small. Should be at least 6 characters"})
  }

  const password = await bcrypt.hash(plainTextPassword,10)

  try {
    const response = await User.create({
      username,
      password
    })
    console.log ("User created successfully: ", response)
  } catch (error){
    if( error.code === 11000){
      //error for dupicate key
    return res.json({status: "error", error: "Userame already in use"})
    }
    throw error
  }
res.json ({status: "ok"})
//  bcrypt.hash ()
})

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(`Server started on port ${port}.`);
});
