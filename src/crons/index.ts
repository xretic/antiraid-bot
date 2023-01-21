import raidCheck from "./raidCheck";

export const startCrons = async (): Promise<void> => {
	await raidCheck();
};
