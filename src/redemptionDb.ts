import { type TeamNames } from "./staffDb";

export class RedemptionDbEntry {
    teamName: TeamNames;
    redeemedBy: string;
    redeemedAt: number;
    constructor(teamName: TeamNames, redeemedBy: string) {
        this.teamName = teamName;
        this.redeemedBy = redeemedBy;
        this.redeemedAt = new Date().getTime();
    }
}

export interface IRedemptionDb {
    load: () => IRedemptionDb;
    teamExistsInDb: (identifier: TeamNames) => boolean;
    getEntryByTeam: (identifier: string) => RedemptionDbEntry | undefined;
    addEntry: (entry: RedemptionDbEntry) => void;
    close: () => void;
}

export class RedemptionDb implements IRedemptionDb {
    database: RedemptionDbEntry[];

    load(): IRedemptionDb {
        // TODO: read some file for now
    }

    getEntryByTeam(identifier: string): RedemptionDbEntry | undefined {
        return this.database.find((entry) => entry.teamName == identifier);
    }

    teamExistsInDb(identifier: TeamNames): boolean {
        return this.getEntryByTeam(identifier)?.teamName == identifier;
    }

    addEntry(entry: RedemptionDbEntry): void {
        this.database.push(entry);
    }

    close(): void {
        // TODO: do some writing to file for now
    }

    constructor() {
        // TODO: build constructor
    }
}
