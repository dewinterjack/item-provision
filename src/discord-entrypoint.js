require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const { bold } = require('@discordjs/builders');
const runner = require('./runner');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	console.log(interaction.isContextMenu());
	if (!interaction.isContextMenu()) return;

	console.log(interaction);
	const { commandName, data } = interaction;

	if (commandName === 'Get Item Details') {
		await interaction.deferReply();
		console.log(data);
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
		const itemData = await runner.run(attachment.url);
		const fields = itemData.map(item => { return {
			name: item.name,
			value: item.minPrice + ' gil'
		}})
		const embed = new MessageEmbed()
			.setTitle('Item Provision')
			.setURL('https://github.com/dewinterjack/item-provision')
			.setDescription('Data gathered from XIV API')
			.addFields(fields)
			.setImage(attachment.url)
			.setTimestamp();
		const channel = client.channels.cache.get(message.channelId);
		await channel.send({ embeds: [embed] });
	}
});

client.login(process.env.DISCORD_TOKEN);