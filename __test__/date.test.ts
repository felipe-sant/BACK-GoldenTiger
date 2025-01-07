import { subHours } from 'date-fns';
import newDate from "../src/functions/utils/newDate"

test("data", () => {
    const adjustedDate = subHours(newDate(), 3);

    expect(newDate()).toEqual(adjustedDate);

})