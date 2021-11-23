import dotenv from 'dotenv';
import { Client, Intents, MessageAttachment, Collection } from 'discord.js';
import { createEmbedFromImage } from './embed';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenu() || interaction.commandName != 'Get Item Details') return;
	const attachments = interaction.options.getMessage('message', true).attachments as Collection<string, MessageAttachment>;
	if(attachments.size > 0) {
		await interaction.deferReply();
		const reply = await createEmbedFromImage(attachments[0]);
		await interaction.editReply({ embeds: [reply] });
	}
});

client.login(process.env.DISCORD_TOKEN);