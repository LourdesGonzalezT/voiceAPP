const { Socket } = require("socket.io");
const { callWhisper, gptChatCompletion } = require('./openai.controller');

let consult;
let completion;

const socketController = async (socket = new Socket()) => {

  console.log('You are online!');

  socket.on('get-transcript', async () => {
    consult = await callWhisper();
    socket.emit('receive-transcript', consult);

    completion = await gptChatCompletion(consult);
    socket.emit('receive-completion', completion);
  });

  socket.on('disconnect', () => {
    console.log('You are offline');
  });
}

module.exports = {
  socketController
}