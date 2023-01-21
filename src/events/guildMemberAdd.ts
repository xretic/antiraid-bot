import { Discord, On, ArgsOf } from "discordx";
import { membersCount } from "../crons/raidCheck";
import startAntiRaid from "../utils/startAntiRaid";
import { Raid } from "../models/Raid";
import sendLog from "../utils/sendLog";
import { EmbedBuilder } from "discord.js";

@Discord()
class GuildMemberAdd {
	@On({ event: "guildMemberAdd" })
	async guildMemberAdd([member]: ArgsOf<"guildMemberAdd">) {
		if (member.user.bot) return;

		const check = await Raid.findOne({ active: true });

		if (
			!check &&
			member.guild.memberCount > membersCount + process.env.JOIN_LIMIT
		) {
			await member.guild
				.edit({
					features: [...member.guild.features, "INVITES_DISABLED"],
				})
				.catch(async (err: Error) => {
					await sendLog(
						new EmbedBuilder()
							.setTitle("Мне не удалось выключить инвайты")
							.setColor(0x2f3136)
					);
					return console.error(err);
				});
			await startAntiRaid();
			return;
		}
	}
}
