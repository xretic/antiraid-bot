import { Discord, On, ArgsOf } from "discordx";
import { client } from "../libs/discord";

@Discord()
class InteractionCreate {
	@On({ event: "interactionCreate" })
	async interactionCreate([interaction]: ArgsOf<"interactionCreate">) {
		client.executeInteraction(interaction);
	}
}
