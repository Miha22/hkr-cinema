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

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await user.findById(id)
      .then((user) => {
        // Verifies the user is not an admin
        if (user.role !== "admin") {
          user.role = role;
          user.save((err) => {
            //Monogodb error checker
            if (err) {
              res
                .status("400")
                .json({ message: "An error occurred", error: err.message });
              process.exit(1);
            }
            res.status("201").json({ message: "Update successful", user });
          });
        } else {
          res.status(400).json({ message: "User is already an Admin" });
        }
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await user.findById(id)
    .then(user => user.remove())
    .then(user =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};