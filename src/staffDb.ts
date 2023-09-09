import * as fs from "fs";

export interface StaffDbEntry {
    staffPassId: string;
    teamName: TeamNames;
    createdAt: number;
}

export interface IStaffDb {
    loadFrom: (filePath: string) => void;
    getEntryByPassId: (identifier: string) => StaffDbEntry | undefined;
    close: () => void;
}

export class StaffDb implements IStaffDb {
    database: StaffDbEntry[];
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

    _csvToArray(csvData: string): StaffDbEntry[] {
        const data: string[] = csvData.split("\n");
        const arr: StaffDbEntry[] = [];
        for (const entry of data) {
            const fields: string[] = entry.split(",");
            const staffPassId = fields[0];
            const teamName = fields[1] as TeamNames;
            const createdAt = Number.parseInt(fields[2]);
            const dbEntry: StaffDbEntry = {
                staffPassId,
                teamName,
                createdAt,
            };
            arr.push(dbEntry);
        }
        return arr;
    }

    getEntryByPassId(identifier: string): StaffDbEntry | undefined {
        return this.database.find((entry) => entry.staffPassId === identifier);
    }

    close(): void {}
}

export enum TeamNames {
    BASS = "BASS",
    RUST = "RUST",
    GRYFFINDOR = "GRYFFINDOR",
    HUFFLEPUFF = "HUFFLEPUFF",
    RAVENCLAW = "RAVENCLAW",
    SLYTHERIN = "SLYTHERIN",
    TEST = "TEST",
}
