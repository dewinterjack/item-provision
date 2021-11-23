import { MessageEmbed } from 'discord.js';
import { run } from './runner';

const createEmbedFromImage = async (imageUrl) => {
	let data = await run(imageUrl);
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

export {
    createEmbedFromImage
}