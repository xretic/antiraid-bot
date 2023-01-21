import { IntentsBitField, TextChannel } from "discord.js";
import { Client } from "discordx";
import { importx } from "@discordx/importer";
import path from "path";

export const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.GuildIntegrations,
		IntentsBitField.Flags.GuildMessageTyping,
		IntentsBitField.Flags.GuildScheduledEvents,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.GuildEmojisAndStickers,
	],
});

export const connectDiscord = async () => {
	await importx(path.resolve("./{src,dist}/{events}/") + "/**/*.{ts,js}");
	await client.login(process.env.DISCORD_TOKEN);
};
