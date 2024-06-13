const uuid = require('uuid').v4;
const id1 = uuid();

const chats = {
    [id1] : {
        chatInput: "initial test message",
        username: "test user",
        isDeleted: false,
    }
};

function isValidChatInput(chat){
    let isValid = true;
    isValid = !!chat && chat.trim();
    isValid = isValid && chat.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function getChat(chatId){
    return chats[chatId];
}

function chatsContain(chatId) {
    return !!chats[chatId] && !chats[chatId].isDeleted;
}

function addChat(username, chatInput){
    const chatId = uuid();
    chats[chatId] = {
        chatInput,
        username,
        isDeleted: false,
    };
    return chatId;
}

function updateChat(chatId, chatUpdate) {
    chats[chatId].chatInput = chatUpdate || chats[chatId].chatInput;
}

function deleteChat(chatId) {
    chats[chatId].isDeleted = true;
}

function getChatHistory() {
    return chats;
}

module.exports = {
    isValidChatInput,
    getChat,
    chatsContain,
    addChat,
    getChatHistory,
    updateChat,
    deleteChat,
};