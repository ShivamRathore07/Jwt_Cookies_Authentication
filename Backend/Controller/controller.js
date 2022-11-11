const User = require("../Schema/schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.GetOneUser = async (req, res, next)=>{
    try {
        return res.status(200).json({ status: true, message:"successfully"});
    } catch (ex) {
        next(ex)
    }
}

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck){
      return res.json({ message: "Email already used", status: false });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let admin={...req.body,password: hashedPassword}
    
    const user = await User.create(admin);    

    return res.status(201).json({ status: true,message:`User Register Successfully`, user});
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user){
      return res.status(404).json({ message: "Invalid Credential", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.status(400).json({ message: "Invalid Credential", status: false });
    }
    const token = jwt.sign({ email: user.email, id: user._id },"AUTHENTICATION", { expiresIn: "1d"});
   
    return res.cookie('access_token',token, { httpOnly: true, secure: true, sameSite: "none" }).cookie("check_Token", true, { secure: true, sameSite: "none"}).status(200).json({ message:"Login successfully",status: true, user,token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logout = async (req, res) => {
  try{
    res.clearCookie('access_token')
    res.clearCookie('check_Token')
    res.status(200).send({ success: true, message: "Log Out Successfully" });
  }catch(err){
    res.status(401).json(err)
  }
}

 