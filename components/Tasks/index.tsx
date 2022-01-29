import { FC } from "react";
import { Checkbox } from "../";
import { Tasks } from "../../@types";
import { collatedTask } from "../../constants";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import { collatedTaskExist, getCollatedTitle, getTitle } from "../../helpers";
import { useTasks } from "../../hooks";
import AddTasks from "./AddTasks";

const Tasks: FC = () => {
	let projectName: string | undefined = "";
	const { selectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();
	const { tasks } = useTasks(selectedProject);
	if (selectedProject && collatedTaskExist(selectedProject)) {
		projectName = getTitle(projects, selectedProject)?.name;
	}
	if (collatedTaskExist(selectedProject) && projects && projects.length > 0 && selectedProject) {
		projectName = getCollatedTitle(collatedTask, selectedProject)?.name;
	}

	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>
			<ul className="tasks__list">
				{tasks.map((task) => (
					<li key={task.id}>
						<Checkbox id={task.id} />
						<span>{task.task}</span>
					</li>
				))}
			</ul>
			<AddTasks showQuickAddTask={false} setShowQuickAddTask={() => {}} />
		</div>
	);
};

export default Tasks;
