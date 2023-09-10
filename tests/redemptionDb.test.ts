import { RedemptionDb, type RedemptionDbEntry } from "../src/redemptionDb";
import { TeamNames } from "../src/staffDb";
import path from "path";

test("New Redemption Entry is created correctly.", () => {
    const redemptionDb = new RedemptionDb();
    const expectedEntry: RedemptionDbEntry = {
        teamName: TeamNames.TEST,
        redeemedBy: "TEST_STAFF",
        redeemedAt: new Date().getTime(),
    };
    const actualEntry = redemptionDb._newRedemptionEntry(TeamNames.TEST, "TEST_STAFF");
    expect(actualEntry).toEqual(expectedEntry);
});

test("Test redemption data loads correctly.", () => {
    const actualDb = new RedemptionDb();
    actualDb.loadFrom(path.join(__dirname, "../data/testRedemption.csv"));
    const expectedDb = new RedemptionDb();
    const expectedEntries: RedemptionDbEntry[] = [
        {
            teamName: TeamNames.TEST,
            redeemedBy: "TEST_STAFF",
            redeemedAt: 1694259357747,
        },
    ];
    expectedDb.database = expectedEntries;
    expectedDb.filePath = path.join(__dirname, "../data/testRedemption.csv");
    expect(actualDb).toEqual(expectedDb);
});

test("Database object converts to string correctly.", () => {
    const testDb = new RedemptionDb();
    const newEntry = testDb._newRedemptionEntry(TeamNames.TEST, "TEST_STAFF");
    testDb.database = [];
    testDb.addEntry(newEntry);
    const actualString = testDb._databaseToString();
    const expectedString = `teamName,redeemedBy,redeemedAt\n${
        TeamNames.TEST
    },TEST_STAFF,${new Date().getTime()}`;
    expect(actualString).toEqual(expectedString);
});

test("Redemption status reports correctly (team HAS redeemed)", () => {
    const teamName = TeamNames.TEST;
    const testDb = new RedemptionDb();
    testDb.loadFrom(path.join(__dirname, "../data/testRedemption.csv"));
    const actualBool = testDb.teamHasNotRedeemed(teamName);
    const expectedBool = false;
    expect(actualBool).toEqual(expectedBool);
});

test("Redemption status reports correctly (team HAS NOT redeemed", () => {
    const teamName = TeamNames.GRYFFINDOR;
    const testDb = new RedemptionDb();
    testDb.loadFrom(path.join(__dirname, "../data/testRedemption.csv"));
    const actualBool = testDb.teamHasNotRedeemed(teamName);
    const expectedBool = true;
    expect(actualBool).toEqual(expectedBool);
});
