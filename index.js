const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('This bot is online!');
});

bot.login(process.env.token);






const userMap = new Map();
const LIMIT = 5;
const TIME = 5000;
const DIFF = 2500;

bot.on('message', message => {
if(message.author.bot) return;
if(userMap.has(message.author.id)) {
    const userData = userMap.get(message.author.id);
    const {  lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
     if(difference > DIFF) {
       clearTimeout(timer);
       console.log('Cleared Timeout');
       userData.msgCount = 1;
       userData.lastMessage = message;
       userData.timer = setTimeout(() => {
        userMap.delete(message.author.id);
        console.log('Removed from RESET.');
       }, TIME);
       userMap.set(message.author.id, userData);
     }
    else {
     ++msgCount;
    if(parseInt(msgCount) === LIMIT) {
      const role = message.guild.roles.cache.get('712317311758893056');
      message.member.roles.add(role);
      message.channel.send(message.author.username + ' Has been muted.');
      setTimeout(() => {
        message.member.roles.remove(role);
        message.channel.send(message.author.username + ' Has been unmuted')
      }, 600000);
    } else {
      userData.msgCount = msgCount;
      userMap.set(message.author.id, userData);
    }
  }
}
else {
    let fn = setTimeout(() => {
     userMap.delete(message.author.id);
     console.log('Removed from map.');
    }, 5000);
    userMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
  });
  }
});