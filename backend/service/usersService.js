const bcrypt = require('bcryptjs');
const userRepository = require('../repository/usersRepository');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

getAllUsers
const getAllUsers = async () => {
 return await usersRepository.findAll();
};

getUserById

const getUserById = async (id) => {
 return await usersRepository.findById(id);
};

createUser
const createUser = async (user) => {
 const hashedPassword = await bcrypt.hash(user.password, 10);
 const newUser = new User(null, user.username, hashedPassword, user.email);
 return await usersRepository.save(newUser);
};

updateUser

const updateUser = async (id, user) => {
 return await usersRepository.update(id, user);
};

deleteUser

const deleteUser = async (id) => {
 await usersRepository.remove(id);
};

authenticateUser
const authenticateUser = async (username, password) => {
 const user = await usersRepository.findByUsername(username);
 if (user && await bcrypt.compare(password, user.password)) {
 const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
 return { token };
 }
 return null;
};




module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
};
