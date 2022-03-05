const user = require("../models/user");

exports.register = async (req, res, next) => {
    const {username, password} = req.body;
    if(password.lenght < 6) {
        return res.status(400).json({message: "Password is less than 6 characters"});
    }
    try {
        await user.create({
            username,
            password,
        }).then(user =>
            res.status(200).json({
                message: "User created",
                user,
            })
        );
    } catch (error) {
        res.status(401).json({
            message: "User not created",
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      });
    }
    try {
        await user.findOne({ 
            username,
            password 
        });
        if (!user) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          });
        } else {
          res.status(200).json({
            message: "Login successful",
            user,
          });
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        });
      }
  };