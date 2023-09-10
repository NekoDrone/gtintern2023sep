import path from "path";
import { getTeamFromStaffDb, loadStaffDatabase } from "../src";
import { StaffDb, TeamNames } from "../src/staffDb";

test("Team is retrieved correctly from staff database", () => {
    const staffDb = new StaffDb();
    staffDb.loadFrom(path.join(__dirname, "../data/testStaff.csv"));
    const userId = "TEST_STAFF";
    const actualTeam: TeamNames = getTeamFromStaffDb(userId, staffDb) as TeamNames;
    const expectedTeam = TeamNames.TEST;
    expect(actualTeam).toEqual(expectedTeam);
});
