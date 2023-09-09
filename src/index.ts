import * as readline from "readline/promises";
import { type TeamNames, type IStaffDb, StaffDb } from "./staffDb";
import { type RedemptionDbEntry, type IRedemptionDb, RedemptionDb } from "./redemptionDb";

void main();

async function main(): Promise<void> {
    const redemptionDb: IRedemptionDb = loadRedemptionDb();
    const staffDb: IStaffDb = loadStaffDatabase();
    const userId: string = await readFromInput();
    const userTeam: TeamNames = getUserTeamFromDatabase(userId, staffDb) as TeamNames;

    if (redemptionDb.teamExistsInDb(userTeam)) {
        const newRedeem: RedemptionDbEntry = {
            teamName: userTeam,
            redeemedBy: userId,
            redeemedAt: new Date().getTime(),
        };
        redemptionDb.addEntry(newRedeem);
    }

    staffDb.close();
    redemptionDb.close();
}

function loadRedemptionDb(): IRedemptionDb {
    const filePath = "./data/redemptionData.csv";
    const database = new RedemptionDb();
    database.loadFrom(filePath);
    return database;
}

function loadStaffDatabase(): IStaffDb {
    const filePath = "./data/staffData.csv";
    const database = new StaffDb();
    database.loadFrom(filePath);
    return database;
}

function getUserTeamFromDatabase(userId: string, database: IStaffDb): string {
    return database.getEntryByPassId(userId)?.teamName as string;
}

async function readFromInput(): Promise<string> {
    const inputInterface = readline.createInterface(process.stdin, process.stdout);
    const input = await inputInterface.question("Please key in staff ID:");
    return input;
}
