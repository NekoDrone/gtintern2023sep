export interface StaffDbEntry {
    staffPassId: string;
    teamName: TeamNames;
    createdAt: number;
}

export interface IStaffDb {
    getEntryByPassId: (identifier: string) => StaffDbEntry | undefined;
}

export class StaffDb implements IStaffDb {
    database: StaffDbEntry[];

    getEntryByPassId(identifier: string): StaffDbEntry | undefined {
        return this.database.find((entry) => entry.staffPassId === identifier);
    }

    // TODO: add necessary query stuff. See redemptionDb.ts for more info
}

export enum TeamNames {
    BASS = "BASS",
    RUST = "RUST",
    GRYFFINDOR = "GRYFFINDOR",
    HUFFLEPUFF = "HUFFLEPUFF",
    RAVENCLAW = "RAVENCLAW",
    SLYTHERIN = "SLYTHERIN",
}
