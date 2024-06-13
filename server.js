const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const petManager = require('./petManager');
const petsData = require('./petsData');
const sessions = require('./sessions');
const users = require('./users');
const chats = require('./chats');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;
  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, petManager.makePetManager());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getPets());
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

app.get('/api/v1/pets', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getPets());
});

app.post('/api/v1/pets', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { pet } = req.body;
  if(!pet) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const petManager = users.getUserData(username);
  const id = petManager.addPet(pet);
  res.json(petManager.getPet(id));
});

app.get('/api/v1/pets/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const petManager = users.getUserData(username);
  const { id } = req.params;
  if(!petManager.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No pet with id ${id}` });
    return;
  }
  res.json(petManager.getPet(id));
});

app.put('/api/v1/pets/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const petManager = users.getUserData(username);
  const { id } = req.params;
  const { name } = req.body;
  if(!name) {
    res.status(400).json({ error: 'required-name' });
    return;
  }
  if(!petManager.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No pet with id ${id}` });
    return;
  }
  petManager.updatePetName(id, { name });
  res.json(petManager.getPet(id));
});

app.patch('/api/v1/pets/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { name } = req.body;
  const petManager = users.getUserData(username);
  if(!petManager.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No pet with id ${id}` });
    return;
  }
  petManager.updatePetName(id, { name });
  res.json(petManager.getPet(id));
});

app.delete('/api/v1/pets/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const petManager = users.getUserData(username);
  const exists = petManager.contains(id);
  if(exists) {
    petManager.deletePet(id);
  }
  res.json({ message: exists ? `pet ${id} deleted` : `pet ${id} did not exist` });
});

app.get('/api/v1/random-pet-parts', (req, res) => {
  const count = parseInt(req.query.count) || 1;
  const randomParts = petsData.getRandomParts(count); 
  res.json(randomParts);
});

app.get('/api/v1/chats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
  }
  const chatHistory = chats.getChatHistory();
  res.json({ chatHistory });
})

app.post('/api/v1/chats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' }); 
      return;
  }
  const { chat } = req.body;
  if (!chat) {
      res.status(400).json({ error: 'required-chat-input' });
      return;
  }
  const chatId = chats.addChat(username, chat);
  const chatData = chats.getChat(chatId);
  res.json({ chatId, chatData });
})

app.patch('/api/v1/chats/:chatId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' })
      return;
  }
  const { chatId } = req.params;
  const { chatUpdate } = req.body;
  if (!chats.chatsContain(chatId)) {
      res.status(404).json({ error: `noSuchId, no chat with id ${chatId}` });
      return;
  }
  chats.updateChat(chatId, chatUpdate);
  const chatData = chats.getChat(chatId);
  res.json({ chatId, chatData });
});

app.delete('/api/v1/chats/:chatId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' })
      return;
  }
  const { chatId } = req.params;
  const chatExists = chats.chatsContain(chatId);
  if (chatExists) {
      chats.deleteChat(chatId);
  }
  res.json({ message: chatExists ? `chat deleted` : `chat did not exist`});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));