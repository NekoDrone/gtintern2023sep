import { getTeamFromStaffDb, loadStaffDatabase } from "../src";
import { TeamNames } from "../src/staffDb";

test("Team is retrieved correctly from staff database", () => {
    const staffDb = loadStaffDatabase();
    const userId = "TEST_STAFF";
    const actualTeam: TeamNames = getTeamFromStaffDb(userId, staffDb) as TeamNames;
    const expectedTeam = TeamNames.TEST;
    expect(actualTeam).toEqual(expectedTeam);
});
