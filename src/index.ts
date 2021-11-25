import dotenv from 'dotenv';
import { Client, Intents, MessageAttachment, Collection } from 'discord.js';
import { createEmbedFromImage } from './embed';
import { logger } from './logger';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	logger.log('info', 'Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenu() || interaction.commandName != 'Get Item Details') return;
		try {
			const attachments = interaction.options.getMessage('message', true).attachments;
		
			if(attachments instanceof Collection){
				await interaction.deferReply();
				const attachment = attachments.first();
				if(!attachment) { throw "Image does not have an attachment." }
				const reply = await createEmbedFromImage(attachment.url);
				await interaction.editReply({ embeds: [reply] });
			}
		} catch(error) {
			logger.log('error', error);
			await interaction.editReply('An unexpected error has occured.')
		}
});

client.login(process.env.DISCORD_TOKEN);