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
    const { lastmessage, timer } = userData;
    const difference = message.createdTimestamp - lastmessage.createdTimestamp
    let msgCount = userData.msgCount;
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout.');
       userData.msgCount = 1;
       userData.lastmessage = message;
       userData.timer = setTimeout(() => {
         userMap.delete(message.author.id);
         console.log('Removed from RESET');
    }, TIME);
    userMap.set(message.author.id, userData);
 }
  else {
    ++msgCount;
    if(parseInt(msgCount) === LIMIT) {
      const role = msesage.guild.roles.cache.get('712377210522304533');
      message.member.roles.add(role);
      message.channel.send(message.author.username + ' Has been muted');
      setTimeout(() => {
        mesasge.member.roles.remove(role);
        message.channel.send(message.author.username + ' Has been unmuted');
     }, TIME);
  } else {
    userData.msgCount = msgCount;
    userMap.set(message.author.id, userData);
   }
 }
}  
else {
  let fn = setTimeout(() => {
    userMap.delete(message.author.id);
    console.log('Removed from map,');
  }, TIME);
  userMap.set(message.author.id, {

    msgCount: 1,
    lastmessage: message,
    timer: fn
  });
  }
});  
  
    
  