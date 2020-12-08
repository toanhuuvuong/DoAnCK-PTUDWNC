const listUser = [];

const listRoom = [];

const addUser = (userId, socketId) => {
  const index = listUser.findIndex(value => value.userId === userId);
  if (index < 0 || isNaN(index)) {
    listUser.push({ userId, socketId });
  } else {
    listUser[index].socketId = socketId;
  }
}

const removeUser = (userId) => {
  const index = listUser.findIndex(item => item.userId != userId);
  listUser.splice(index, 1);
}

const getUserSocketId = (userId) => {
  const user = listUser.find(value => value.userId === userId);
  return user.socketId;
}

module.exports = {
  addUser,
  removeUser,
  getUserSocketId,
}