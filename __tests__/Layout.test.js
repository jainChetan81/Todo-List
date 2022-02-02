import { cleanup, fireEvent, render } from "@testing-library/react";
import { Layout } from "../components";
beforeEach(cleanup);
describe("<Layout />", () => {
	it("should render without crashing", () => {
		const { queryByTestId, debug } = render(<Layout title="Test" />);
		expect(queryByTestId("application")).toBeTruthy();
		// test for the value of title of page
	});
});
