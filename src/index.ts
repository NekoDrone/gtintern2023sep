import * as readline from "readline/promises";
import { type TeamNames, type IStaffDb } from "./staffDb";
import { RedemptionDbEntry, type IRedemptionDb } from "./redemptionDb";

void main();

async function main(): Promise<void> {
    const staffDb: IStaffDb = loadStaffDatabase();
    const redemptionDb: IRedemptionDb = loadRedemptionDb();
    const userId: string = await readFromInput();
    const userTeam = getUserTeamFromDatabase(userId, staffDb);

    if (redemptionDb.teamExistsInDb(userTeam)) {
        // if(redemptionDb.getEntry(userTeam)?.team_name != userTeam)
        const newRedeem: RedemptionDbEntry = new RedemptionDbEntry(userTeam, userId);
        redemptionDb.addEntry(newRedeem);
    }
}

function loadStaffDatabase(): IStaffDb {
    throw new Error("Function not implemented"); // TODO:
}

function loadRedemptionDb(): IRedemptionDb {
    throw new Error("Function not implemented"); // TODO:
}

function getUserTeamFromDatabase(userId: string, database: IStaffDb): TeamNames {
    return database.getEntryByPassId(userId)?.teamName as string;
}

async function readFromInput(): Promise<string> {
    const inputInterface = readline.createInterface(process.stdin, process.stdout);
    const input = await inputInterface.question("Please key in staff ID:");
    return input;
}
