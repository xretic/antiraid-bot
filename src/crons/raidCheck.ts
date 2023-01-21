import { CronJob } from "cron";
import { client } from "../libs/discord";
import moment from "moment";
import { Raid } from "../models/Raid";
import sendLog from "../utils/sendLog";
import { EmbedBuilder } from "discord.js";

export let membersCount: number;

const cron = async () => {
	try {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		membersCount = guild.memberCount;

		const check = await Raid.findOne({ active: true });
		if (check) {
			if (moment().unix() - check.date > process.env.RAID_TIMEOUT) {
				await Raid.findOne({ active: true });

				await sendLog(
					new EmbedBuilder().setTitle("Антирейд выключен").setColor(0x2f3136)
				);

				await Raid.updateOne({ active: true }, { active: false });

				await guild.edit({
					features: [...guild.features.filter((x) => x !== "INVITES_DISABLED")],
				});
			}
		}
	} catch (err) {
		console.log("Произошла ошибка при выполнении крона raidCheck.ts", err);
	}
};

export default async (): Promise<void> => {
	new CronJob("* * * * *", cron, null, true, null, null, true);
};
