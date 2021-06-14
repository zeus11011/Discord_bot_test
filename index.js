require('dotenv').config();

const Discord = require('discord.js');
const { Client, MessageEmbed , MessageAttachment } = require('discord.js');

const client = new Client();

const TOKEN = process.env.TOKEN;

var prefix = ">";


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (!message.guild) return;


  if (message.content.startsWith(prefix + 'kick')) {

      const user = message.mentions.users.first();

      if (user) {
        const member = message.guild.member(user);
        if (member) {

          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {

              message.reply(`Successfully kicked ${user.tag}`);
              const embed = new MessageEmbed()
                .setTitle('Bye Bye')
                .setImage(
              `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
                .setColor(0xff0000)
              message.channel.send(embed);

            })
            .catch(err => {

              message.reply('I was unable to kick the member');

              console.error(err);
            });
        } else {

          message.reply("That user isn't in this guild!");
        }

      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }
  else if (message.content.startsWith(prefix + 'ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
  else if (message.content.startsWith(prefix + 'testkick')) {
    // Send the user's avatar URL
    const user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setTitle('Bye Bye')
      .setImage(
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
      .setColor(0xff0000)
    message.channel.send(embed);
  }
});



client.login(TOKEN);
