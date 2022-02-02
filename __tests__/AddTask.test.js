import { fireEvent, render } from "@testing-library/react";
import AddTasks from "../components/Tasks/AddTasks";

jest.mock("../context", () => {
	useSelectedProjectValue: jest.fn(() => ({
		selectedProject: 1,
	}));
	useProjectsValue: jest.fn(() => ({
		projects: [
			{
				name: "Project Name",
				projectId: "1",
				userId: "1",
				docId: "1",
			},
		],
	}));
});
jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				add: jest.fn(() => Promise.resolve("Never Mock Firebase")),
			})),
		})),
	},
}));
describe("<AddTask />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should render without crashing", () => {
		const { queryByTestId } = render(
			<AddTasks showAddTaskMain={true} showQuickAddTask={false} setShowQuickAddTask={() => {}} />
		);
		expect(queryByTestId("add-task-comp")).toBeTruthy();
	});
	it("should render the quick overlay", () => {
		const { queryByTestId } = render(
			<AddTasks showAddTaskMain={true} showQuickAddTask={true} setShowQuickAddTask={() => {}} />
		);
		expect(queryByTestId("quick-add-task")).toBeTruthy();
	});
	test("should renders the <AddTask/> main showcase when clicked", () => {
		const { queryByTestId } = render(
			<AddTasks showAddTaskMain showQuickAddTask setShowQuickAddTask={() => {}} />
		);
		fireEvent.click(queryByTestId("show-main-action"));
		expect(queryByTestId("show-main-action")).toBeTruthy();
	});
});
