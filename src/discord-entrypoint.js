require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { bold } = require('@discordjs/builders');
const runner = require('./runner');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'checkprice') {
		await interaction.deferReply();
		const discordData = await runner.run();
		let message = '';
		discordData.forEach(item => message += bold(item.name) + ': ' + item.minPrice + 'gil' + '\n');
		await interaction.editReply(message);
	}
});

client.on('messageCreate', async message => {
	const mentioned = message.content.includes(`<@!${process.env.CLIENT_ID}>`);
	if(mentioned && message.attachments.size > 0) {
		const attachment = message.attachments.first();
		console.log(attachment.url);
		const data = await runner.run(attachment.url);
		let reply = '';
		data.forEach(item => reply += bold(item.name) + ': ' + item.minPrice + 'gil' + '\n');
		const channel = client.channels.cache.get(message.channelId);
		await channel.send(reply);
	}
});

client.login(process.env.DISCORD_TOKEN);