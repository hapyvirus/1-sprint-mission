import userRepository from "../repositories/userRepository.js";

async function createUser(user) {
  const createdUser = await userRepository.save(user);

  return createdUser;
}

export default { createUser };
