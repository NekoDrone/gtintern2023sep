import { RedemptionDb, type RedemptionDbEntry } from "../src/redemptionDb";
import { TeamNames } from "../src/staffDb";
import { loadRedemptionDb } from "../src/index";

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

test;
