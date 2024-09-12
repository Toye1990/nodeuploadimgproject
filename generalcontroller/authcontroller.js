const usermodel = require('../model/usermodel')
const { uservalidate, loginvalidate } = require('../middleware/validate')

const createNewUser = async(req, res) =>{
   try {
      const {error} = uservalidate(req.body)
      console.log(error)
      if(error){
        return res.render("login-register", {message:error.details[0].message, error:true})
      }

    const {username, email, password, confirmpassword} = req.body
    const checkemailnow = usermodel.findOne({ email: email })
    const checkingusername = usermodel.findOne({username: username})
    if(checkemailnow){
        return res.render("login-register", {message:"Email already exists", error:true})
    }

    if(checkingusername){
        return res.render("login-register", {message:"Username already exists", error:true})
    }

    if(password !== confirmpassword){
        return res.render("login-register", {message:"Passwords do not match", error:true})
    }


   await usermodel.create({
    username: username,
    email: email,
    password: password,
   })

   return res.render("login-register", {message:"account created successfully, please login", error: false})

   } catch (err) {
    console.log(err.message)
    res.render("404", {status:500, title:"internal server error", heading:"Oop...an error occurred" })
   }
}

module.exports = {createNewUser}