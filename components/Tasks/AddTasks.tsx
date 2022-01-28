import { addDoc } from "firebase/firestore";
import moment from "moment";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { FaRegCalendarAlt, FaRegListAlt, FaSkullCrossbones } from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { taskCollectionRef } from "../../firebase";
import ProjectOverlay from "./ProjectOverlay";
import TaskDate from "./TaskDate";

type Props = {
	showAddTaskMain?: boolean;
	showShouldMain?: boolean;
	showQuickAddTask?: boolean;
	setShowQuickAddTask?: Dispatch<SetStateAction<boolean>>;
};
const AddTasks: FC<Props> = ({
	showAddTaskMain = true,
	showShouldMain = false,
	showQuickAddTask = false,
	setShowQuickAddTask = () => {},
}) => {
	const [task, setTask] = useState<string>("");
	const [taskDate, setTaskDate] = useState<string>("");
	const [project, setProject] = useState<string>("");
	const [showMain, setShowMain] = useState<boolean>(showShouldMain);
	const [showProjectOverlay, setShowProjectOverlay] = useState<boolean>(false);
	const [showTaskDate, setShowTaskDate] = useState<boolean>(false);
	const { selectedProject } = useSelectedProjectValue();

	const addTask = () => {
		const projectId: string = project || selectedProject;
		console.log("first");
		let collatedDate: string = "";
		if (projectId === "TODAY") {
			collatedDate = moment().format("DD/MM/YYYY");
		} else if (projectId === "NEXT_7") {
			collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
		}
		return (
			task &&
			projectId &&
			addDoc(taskCollectionRef, {
				archived: false,
				projectId,
				task,
				date: collatedDate || taskDate,
				userId: "UESs1wMq3aMShh6543F9",
			})
				.then(() => {
					setTask("");
					setProject("");
					setTaskDate("");
					setShowMain(false);
					setShowProjectOverlay(false);
					setShowTaskDate(false);
					setShowQuickAddTask(false);
				})
				.catch((e: Error) => {
					console.error("error", e.message);
				})
		);
	};
	return (
		<div className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"} data-testid="add-task-comp">
			{showAddTaskMain && (
				<div
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => setShowMain(!showMain)}
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</div>
			)}
			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<div data-testid="quick-add-task">
							<h2 className="header">Quick Add Task</h2>
							<span
								className="add-task__cancel-x"
								data-testid="add-task-quick-cancel"
								onClick={() => {
									setShowMain(false);
									setShowProjectOverlay(false);
									setShowQuickAddTask(false);
								}}
							>
								<FaSkullCrossbones />
							</span>
						</div>
					)}
					<ProjectOverlay
						setProject={setProject}
						showProjectOverlay={showProjectOverlay}
						setShowProjectOverlay={setShowProjectOverlay}
					/>
					<TaskDate setTaskDate={setTaskDate} showTaskDate={showTaskDate} setShowTaskDate={setShowTaskDate} />
					<input
						type="text"
						className="add-task__content"
						data-testid="add-task-content"
						value={task}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.currentTarget.value)}
					/>
					<button
						type="button"
						className="add-task__submit"
						data-testid="add-task-submit"
						onClick={() => addTask()}
					>
						Add Task
					</button>
					{!showQuickAddTask && (
						<span
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
						>
							Cancel
						</span>
					)}
					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => setShowProjectOverlay(!showProjectOverlay)}
					>
						<FaRegListAlt />
					</span>
					<span
						className="add-task__date"
						data-testid="add-task-date-overlay"
						onClick={() => setShowTaskDate(!showTaskDate)}
					>
						<FaRegCalendarAlt />
					</span>
				</div>
			)}
		</div>
	);
};

export default AddTasks;
