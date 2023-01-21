import { Discord, On, ArgsOf } from "discordx";

@Discord()
class Ready {
	@On({ event: "ready" })
	async ready([readyClient]: ArgsOf<"ready">) {
		console.log("Discord bot is ready!");
	}
}
