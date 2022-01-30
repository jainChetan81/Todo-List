import { deleteDoc, doc, DocumentData, DocumentReference } from "firebase/firestore";
import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "../";
import { Tasks } from "../../@types";
import collatedTask from "../../constants";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import { firestore } from "../../firebase";
import { collatedTaskExist, getCollatedTitle, getTitle } from "../../helpers";
import { useTasks } from "../../hooks";
import AddTasks from "./AddTasks";

const Tasks: FC = () => {
	let projectName: string | undefined = "";
	const { selectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();
	const { tasks, archivedTasks } = useTasks(selectedProject);
	if (selectedProject && collatedTaskExist(selectedProject)) {
		projectName = getTitle(projects, selectedProject)?.name;
	}
	if (projects && projects.length > 0 && selectedProject && collatedTaskExist(selectedProject)) {
		projectName = getCollatedTitle(collatedTask, selectedProject)?.name;
	}
	const deleteTask = (id: string) => {
		const documentRef: DocumentReference<DocumentData> = doc(firestore, "tasks", id);
		deleteDoc(documentRef);
	};
	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>
			<ul className="tasks__list">
				{tasks.map((task) => (
					<li key={task.id}>
						<Checkbox id={task.id} archived={task.archived} />
						<span>{task.task}</span>
						<button onClick={() => deleteTask(task.id)}>
							<FaTrashAlt />
						</button>
					</li>
				))}
			</ul>
			<AddTasks showQuickAddTask={false} setShowQuickAddTask={() => {}} />
			<h2 data-testid="project-name">Archived {projectName}</h2>
			<ul className="tasks__list archived">
				{archivedTasks.map((task) => (
					<li key={task.id}>
						<Checkbox id={task.id} archived={task.archived} />
						<s>{task.task}</s>
						<button onClick={() => deleteTask(task.id)}>
							<FaTrashAlt />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
