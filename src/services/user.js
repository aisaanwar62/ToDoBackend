const Auth = require("../models/auth");
const User = require("../models/user");

const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { loginId, email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);
    const auth = new Auth({
      fullName: loginId,
      email: email,
      password: hashpassword,
    });

    await auth.save();
    res.status(201).send({ message: "registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const isExisted = await Auth.findOne({ fullName: loginId });
    if (!isExisted) {
      return res.status(409).send({ message: "email is not found" });
    }

    const comparePassword = bcrypt.compare(password, isExisted.password);

    if (!comparePassword) {
      return res.status(409).send({ message: "password is not correct!" });
    }

    res.status(201).send({ message: "login successfully" });
  } catch (error) {
    console.error(error);
  }
};
const adduser = async (req, res) => {
  try {
    const { fullName, email, address, status } = req.body;

    const user = new User({
      fullName: fullName,
      email,
      address: address,
      status: status,
    });

    await user.save();
    res.status(201).send({ message: "User successfully Added" });
  } catch (error) {
    console.error(error);
  }
};
const getuser = async (req, res) => {
  try {
    // Assuming you are fetching user by id
    const user = await User.find(req.body);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const deleteuser = async (req, res) => {
  const user_id = req.params.id;

  try {
    // Use Mongoose findByIdAndDelete to delete the user by ID
    const deletedUser = await User.findByIdAndDelete(user_id);

    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log("User deleted successfully:", deletedUser);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Server error" });
  }
};

const edituser = async (req, res) => {
  const user_Id = req.params.id;
  console.log("Received PATCH request for user ID:", user_Id);

  try {
    // Retrieve user record from the database
    const user = await User.findById(user_Id);

    if (!user) {
      // If user with the given ID is not found, return 404 Not Found
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data with the new values from the request body
    const { fullName, email, address, status } = req.body;
    user.fullName = fullName;
    user.email = email;
    user.address = address;
    user.status = status; // Update the name field, you can update other fields similarly

    // Save the updated user record back to the database
    await user.save();
    console.log(user);
    // Send a success response
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addemployee = async (req, res) => {
  try {
    const { name, company, email, verification_code } = req.body;
    console.log(verification_code);
    const employee = new Employee({
      name,
      company,
      email,
      verification_code,
    });

    await employee.save();
    res.status(201).send({ message: "employee successfully Added" });
  } catch (error) {
    console.error(error);
  }
};
const getemployee = async (req, res) => {
  try {
    // Assuming you are fetching user by id
    const employee = await Employee.find(req.body);

    if (!employee) {
      return res.status(404).send({ message: "employee not found" });
    }

    res.status(200).send({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const getEmployeeByVerificationCode = async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming verification_code is a unique field in your database
    const employee = await Employee.findOne({ verification_code: id });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // If the verification code matches, send the employee details
    res.status(200).send({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  login,
  register,
  adduser,
  getuser,
  deleteuser,
  edituser,
  addemployee,
  getemployee,
  getEmployeeByVerificationCode,
};
