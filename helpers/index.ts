import { collatedTask } from "../constants";

export const collatedTaskExist = (selectedProject: string | number) => {
	return collatedTask.find((task) => task.key === selectedProject);
};
