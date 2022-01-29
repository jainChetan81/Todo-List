import { COLLATED_TASKS, Projects } from "../@types";
import collatedTask from "../constants";

export const collatedTaskExist = (selectedProject: string | number) =>
	collatedTask.find((task) => task.key === selectedProject);

export const getTitle = (projects: Projects[], projectId: string | number): Projects | undefined =>
	projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects: COLLATED_TASKS[], key: string | number): COLLATED_TASKS | undefined =>
	projects.find((project) => project.key === key);

export const generatePushId = (() => {
	const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

	const lastRandChars: number[] = [];

	return function () {
		let now = new Date().getTime();

		const timeStampChars = new Array(8);
		for (var i = 7; i >= 0; i--) {
			timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
			now = Math.floor(now / 64);
		}

		let id = timeStampChars.join("");

		for (i = 0; i < 12; i++) {
			id += PUSH_CHARS.charAt(lastRandChars[i]);
		}

		return id;
	};
})();
