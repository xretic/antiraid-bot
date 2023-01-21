export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			MONGO_URL: string;
			GUILD_ID: string;
			LOGS_CHANNEL_ID: string;
			JOIN_LIMIT: number;
			RAID_TIMEOUT: number;
		}
	}
}
