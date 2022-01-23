import { FC } from "react";
import { Checkbox } from ".";
import { Tasks } from "../@types";
import { useTasks } from "../hooks";

const Tasks: FC = () => {
	let projectName = "";
	const { tasks } = useTasks("1");
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
		</div>
	);
};

export default Tasks;
