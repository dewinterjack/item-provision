require('dotenv').config();
const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes, ApplicationCommandType } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('checkprice').setDescription('Looks at the last image you posted to check market prices'),
	new ContextMenuCommandBuilder().setName('Get Item Details').setType(ApplicationCommandType.Message)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);