import type { FC } from "react";
import { Sidebar } from ".";
import { useTasks } from "../hooks";

const Container: FC = () => {
	const { tasks, archivedTasks } = useTasks();
	return (
		<div>
			<Sidebar />
		</div>
	);
};

export default Container;
