import { addDoc } from "firebase/firestore";
import moment from "moment";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaRegCalendarAlt, FaRegListAlt, FaSkullCrossbones } from "react-icons/fa";
import { Input } from "..";
import { useSelectedProjectValue } from "../../context";
import { taskCollectionRef } from "../../firebase";
import ProjectOverlay from "./ProjectOverlay";
import TaskDate from "./TaskDate";
type Props = {
	showAddTaskMain?: boolean;
	showQuickAddTask: boolean;
	setShowQuickAddTask: Dispatch<SetStateAction<boolean>>;
};
const AddTasks: FC<Props> = ({ showAddTaskMain = true, showQuickAddTask = false, setShowQuickAddTask = () => {} }) => {
	const [taskDate, setTaskDate] = useState<string>("");
	const [project, setProject] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [showMain, setShowMain] = useState<boolean>(false);
	const [showProjectOverlay, setShowProjectOverlay] = useState<boolean>(false);
	const [showTaskDate, setShowTaskDate] = useState<boolean>(false);
	const { selectedProject } = useSelectedProjectValue();

	const addTask = () => {
		const projectId: string = project || selectedProject;
		let collatedDate: string = "";
		if (projectId === "TODAY") {
			collatedDate = moment().format("DD/MM/YYYY");
		} else if (projectId === "NEXT_7") {
			collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
		}
		return (
			message &&
			projectId &&
			addDoc(taskCollectionRef, {
				archived: false,
				projectId,
				task: message,
				date: collatedDate || taskDate,
				userId: "UESs1wMq3aMShh6543F9",
			})
				.then(() => {
					setMessage("");
					setProject("");
					setTaskDate("");
					setShowMain(false);
					setShowProjectOverlay(false);
					setShowTaskDate(false);
					if (showQuickAddTask !== undefined) setShowQuickAddTask(false);
				})
				.catch((e: Error) => {
					console.error("error #%d", e.message);
				})
		);
	};
	return (
		<div className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"} data-testid="add-task-comp">
			{showAddTaskMain && (
				<button
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => setShowMain(!showMain)}
					aria-label="Add Task"
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</button>
			)}
			{(showMain || showQuickAddTask) && (
				<form className="add-task__main" data-testid="add-task-main" onSubmit={(e) => e.preventDefault()}>
					{showQuickAddTask && (
						<div data-testid="quick-add-task">
							<h2 className="header">Quick Add Task</h2>
							<button
								className="add-task__cancel-x"
								data-testid="add-task-quick-cancel"
								onClick={() => {
									setShowMain(false);
									setShowProjectOverlay(false);
									setShowQuickAddTask(false);
								}}
								aria-label="Cancel Add Task"
							>
								<FaSkullCrossbones />
							</button>
						</div>
					)}
					<ProjectOverlay
						setProject={setProject}
						showProjectOverlay={showProjectOverlay}
						setShowProjectOverlay={setShowProjectOverlay}
					/>
					<TaskDate setTaskDate={setTaskDate} showTaskDate={showTaskDate} setShowTaskDate={setShowTaskDate} />{" "}
					<Input message={message} setMessage={setMessage} testid="add-message-content" />
					<button
						type="submit"
						className="add-task__submit"
						data-testid="add-task-submit"
						aria-label="Add Task"
						onClick={addTask}
					>
						Add Task
					</button>
					{!showQuickAddTask && (
						<button
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
							aria-label="Cancel Add Task"
						>
							Cancel
						</button>
					)}
					<button
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => setShowProjectOverlay(!showProjectOverlay)}
						onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
						aria-label="Add Task"
					>
						<FaRegListAlt />
					</button>
					<button
						className="add-task__date"
						data-testid="add-task-date-overlay"
						onClick={() => setShowTaskDate(!showTaskDate)}
						onKeyDown={() => setShowTaskDate(!showTaskDate)}
						aria-label="Cancel Add Task"
					>
						<FaRegCalendarAlt />
					</button>
				</form>
			)}
		</div>
	);
};

export default AddTasks;
