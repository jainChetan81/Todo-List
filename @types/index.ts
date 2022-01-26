import { Dispatch, SetStateAction } from "react";

export type Tasks = {
	id: string;
	archived: boolean;
	date: string;
	projectId: string;
	task: string;
	userId: string;
};
export type TaskContextType = {
	tasks: Tasks[] | [];
	setTasks: Dispatch<SetStateAction<[] | Tasks[]>> | (() => void);
};
export type ProjectContextType = {
	projects: Projects[] | [];
	setProjects: Dispatch<SetStateAction<[] | Projects[]>> | (() => void);
};
export type COLLATED_TASKS = {
	key: string;
	name: string;
};
export type Projects = {
	docId: string;
	name: string;
	projectId: string;
	userId: string;
	key?: string;
};
export type User = {
	firstName: string;
	lastName: string;
	twitter: string;
	userId: string;
	id: string;
};
