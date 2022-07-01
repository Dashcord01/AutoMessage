const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

/**
 * Der Kanal wo Der Bot Die Nachricht senden Soll
 * @type {string}
 */
const ROOM = 'Kanal-ID';

const MINUTE = 1000 * 60
const HOUR = 60 * MINUTE

/**
 * Zeit Zwischen Dem Status Wechsel
 * @type {number}
 */
const CHANGE_STATUS_INTERVAL = 1 * MINUTE;
/**
 * Zeit Bis eine Neue Nachricht Kommt
 * @type {number}
 */
const SEND_MESSAGE_INTERVAL = 3 * HOUR;
/**
 Der Bot kann eine Nachricht nach der Anzahl der Nachrichten von Benutzern senden
 Wie viele Nachrichten müssen gesendet werden, um den Bot zum Senden der Nachricht zu zwingen
 @type {number}
 */
const SEND_MESSAGE_AFTER_MESSAGES = 120;

const messages = [
    "Status - 1",
    "Status - 2",
];

const chatMessages = [
    "Nachricht - 1",
    "Nachricht - 2",
    "Nachricht - 3",
];

function changeStatus() {
    client.user.setActivity(messages[Math.floor(Math.random() * messages.length)], {type: 'WATCHING'});
}

function sendMessage() {
    client.channels.fetch(ROOM).then((channel) => {
        channel.send(chatMessages[Math.floor(Math.random() * chatMessages.length)])
    });
}

setInterval(() => {
    if (client.isReady()) {
        changeStatus()
    }
}, CHANGE_STATUS_INTERVAL)

setInterval(() => {
    if (client.isReady()) {
        sendMessage();
    }
}, SEND_MESSAGE_INTERVAL)

client.on('ready', () => {
    console.log(`Eingeloggt in ${client.user.tag}!`);

    client.user.setActivity(messages[Math.floor(Math.random() * messages.length)], {type: 'WATCHING'});
});

let messageCounter = 0;

client.on('messageCreate', async message => {
    if(message.channelId !== ROOM) return;

    messageCounter ++;

    if(messageCounter > SEND_MESSAGE_AFTER_MESSAGES){
        sendMessage();
        messageCounter = 0;
    }
});

client.login('Dein Bot Token');
