import path from "path";
import { getTeamFromStaffDb, loadRedemptionDb, loadStaffDatabase } from "../src";
import { StaffDb, TeamNames } from "../src/staffDb";
import { RedemptionDb } from "../src/redemptionDb";

test("Team is retrieved correctly from staff database", () => {
    const staffDb = new StaffDb();
    staffDb.loadFrom(path.join(__dirname, "../data/testStaff.csv"));
    const userId = "TEST_STAFF";
    const actualTeam: TeamNames = getTeamFromStaffDb(userId, staffDb) as TeamNames;
    const expectedTeam = TeamNames.TEST;
    expect(actualTeam).toEqual(expectedTeam);
});

test("Redemption database loads properly", () => {
    // not even sure if these tests are necessary, since they effectively perform the same function
    // and if the database implementation changes, both the test and the implementation will change, so it's a useless test?
    // 100% test coverage is not realistic for this I don't think.
    const actualDb = loadRedemptionDb();
    const expectedDb = new RedemptionDb();
    expectedDb.loadFrom(path.join(__dirname, "/../data/redemptionData.csv"));
    expect(actualDb).toEqual(expectedDb);
});

test("Staff database loads properly", () => {
    // see above
    const actualDb = loadStaffDatabase();
    const expectedDb = new StaffDb();
    expectedDb.loadFrom(path.join(__dirname, "/../data/staffData.csv"));
    expect(actualDb).toEqual(expectedDb);
});
