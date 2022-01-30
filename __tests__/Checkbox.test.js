import { cleanup, fireEvent, render } from "@testing-library/react";
import { Checkbox } from "../components";
beforeEach(cleanup);
jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				doc: jest.fn(() => ({
					update: jest.fn(),
				})),
			})),
		})),
	},
}));
describe("checkbox", () => {
	describe("success", () => {
		test("should renders the task checkbox", () => {
			const { queryByTestId, debug } = render(<Checkbox id="1" archived={false} />);
			expect(queryByTestId("checkbox-action")).toBeTruthy();
		});
		test("should renders the task checkbox and accept a click", () => {
			const { queryByTestId, debug } = render(<Checkbox id="1" archived={false} />);
			expect(queryByTestId("checkbox-action")).toBeTruthy();
			fireEvent.click(queryByTestId("checkbox-action"));
		});
		test("should renders the task checkbox and accept a onkeydown", () => {
			const { queryByTestId, debug } = render(<Checkbox id="1" archived={false} />);
			expect(queryByTestId("checkbox-action")).toBeTruthy();
			fireEvent.keyDown(queryByTestId("checkbox-action"));
		});
	});
});
