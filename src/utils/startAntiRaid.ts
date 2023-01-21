import { Raid } from "../models/Raid";
import moment from "moment";
import { EmbedBuilder } from "discord.js";
import sendLog from "./sendLog";

export default async (): Promise<void> => {
	const raid = await Raid.create({ date: moment().unix() });

	await sendLog(
		new EmbedBuilder()
			.setTitle("Антирейд запущен")
			.setFields({
				name: "> Дата выключение",
				value: `<t:${raid.date + process.env.RAID_TIMEOUT}:R>`,
			})
			.setColor(0x2f3136)
	);
};
