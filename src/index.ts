import * as readline from "readline/promises";
import { type TeamNames, type IStaffDb, StaffDb } from "./staffDb";
import { type IRedemptionDb, RedemptionDb } from "./redemptionDb";
import * as path from "path";

// void main();

export async function main(): Promise<void> {
    const redemptionDb: IRedemptionDb = loadRedemptionDb();
    const staffDb: IStaffDb = loadStaffDatabase();
    const userId: string = await readFromInput();
    const userTeam: TeamNames = getTeamFromStaffDb(userId, staffDb) as TeamNames;
    if (redemptionDb.teamHasNotRedeemed(userTeam)) {
        redemptionDb.redeemForTeamByUser(userTeam, userId);
    }

    staffDb.close();
    redemptionDb.close();
}

export function loadRedemptionDb(): IRedemptionDb {
    const filePath = path.join(__dirname, "/../data/redemptionData.csv");
    const database = new RedemptionDb();
    database.loadFrom(filePath);
    return database;
}

export function loadStaffDatabase(): IStaffDb {
    const filePath = path.join(__dirname, "/../data/staffData.csv");
    console.log(filePath);
    const database = new StaffDb();
    database.loadFrom(filePath);
    return database;
}

async function readFromInput(): Promise<string> {
    const inputInterface = readline.createInterface(process.stdin, process.stdout);
    const input = await inputInterface.question("Please key in staff ID:\n");
    inputInterface.close();
    return input;
}

export function getTeamFromStaffDb(userId: string, database: IStaffDb): string {
    return database.getEntryByPassId(userId)?.teamName as string;
}
