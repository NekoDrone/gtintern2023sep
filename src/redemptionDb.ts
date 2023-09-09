import { type TeamNames } from "./staffDb";
import * as fs from "fs";

export interface RedemptionDbEntry {
    teamName: TeamNames;
    redeemedBy: string;
    redeemedAt: number;
}

export interface IRedemptionDb {
    loadFrom: (filePath: string) => void;
    teamHasNotRedeemed: (identifier: TeamNames) => boolean;
    getEntryByTeam: (identifier: string) => RedemptionDbEntry | undefined;
    redeemForTeamByUser: (userTeam: TeamNames, userId) => void;
    addEntry: (entry: RedemptionDbEntry) => void;
    close: () => void;
}

export class RedemptionDb implements IRedemptionDb {
    database: RedemptionDbEntry[];
    filePath: string;

    loadFrom(filePath: string): void {
        this.filePath = filePath;
        let fileData: string = "";
        try {
            fileData = fs.readFileSync(this.filePath, "utf-8");
        } catch (err) {
            console.log("Something went wrong while reading from file:" + err);
        }
        this.database = this._csvToArray(fileData);
    }

    _csvToArray(csvData: string): RedemptionDbEntry[] {
        const data: string[] = csvData.split("\n");
        const arr: RedemptionDbEntry[] = [];
        for (const entry of data) {
            const fields: string[] = entry.split(",");
            const teamName = fields[0] as TeamNames;
            const redeemedBy = fields[1];
            const redeemedAt = Number.parseInt(fields[2]);
            const dbEntry: RedemptionDbEntry = {
                teamName,
                redeemedBy,
                redeemedAt,
            };
            arr.push(dbEntry);
        }
        return arr;
    }

    getEntryByTeam(identifier: string): RedemptionDbEntry | undefined {
        return this.database.find((entry) => entry.teamName == identifier);
    }

    teamHasNotRedeemed(identifier: TeamNames): boolean {
        return this.getEntryByTeam(identifier)?.teamName != identifier;
    }

    redeemForTeamByUser(userTeam: TeamNames, userId: any): void {
        const newRedeem: RedemptionDbEntry = this._newRedemptionEntry(userTeam, userId);
        this.addEntry(newRedeem);
    }

    addEntry(entry: RedemptionDbEntry): void {
        this.database.push(entry);
    }

    close(): void {
        const csvData: string = this._databaseToString();
        try {
            fs.writeFileSync(this.filePath, csvData, "utf-8");
        } catch (err) {
            console.log("Something went wrong while saving to file:" + err);
        }
    }

    _databaseToString(): string {
        let result: string = "teamName,redeemedBy,redeemedAt\n";
        for (const entry of this.database) {
            result += entry.teamName + ",";
            result += entry.redeemedBy + ",";
            result += entry.redeemedAt + "\n";
        }
        return result;
    }

    _newRedemptionEntry(userTeam: TeamNames, userId: string): RedemptionDbEntry {
        return {
            teamName: userTeam,
            redeemedBy: userId,
            redeemedAt: new Date().getTime(),
        };
    }
}
