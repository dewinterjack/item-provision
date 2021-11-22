require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const { bold } = require('@discordjs/builders');
const runner = require('./runner');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenu()) return;

	const message = interaction.options.getMessage('message');
	if(interaction.commandName === 'Get Item Details' && message.attachments.size > 0) {
		await interaction.deferReply();
		let attachment = message.attachments.first();
		const reply = await createEmbedFromImage(attachment.url);
		await interaction.editReply({ embeds: [reply] });
	}	
});

client.on('messageCreate', async message => {
	const mentioned = message.content.includes(`<@!${process.env.CLIENT_ID}>`);
	if(mentioned && message.attachments.size > 0) {
		let attachment = message.attachments.first();
		const reply = await createEmbedFromImage(attachment.url);
		await channel.send({ embeds: [reply] });
	}
});

client.login(process.env.DISCORD_TOKEN);

const createEmbedFromImage = async (imageUrl) => {
	let data = await runner.run(imageUrl);
	const fields = data.map(item => { return {
		name: item.name,
		value: item.minPrice + ' gil'
	}})
	return new MessageEmbed()
		.setTitle('Item Provision')
		.setURL('https://github.com/dewinterjack/item-provision')
		.setDescription('Data gathered from XIV API')
		.addFields(fields)
		.setImage(imageUrl)
		.setTimestamp();
}