import { Context, createContext, useContext } from "react";
import { ProjectContextType } from "../@types";
import { useProjects } from "../hooks";

export const ProjectsContext: Context<any> = createContext([[], () => {}]);
export const ProjectsProvider = ({ children }: any): JSX.Element => {
	const { projects, setProjects } = useProjects();
	return <ProjectsContext.Provider value={{ projects, setProjects }}>{children}</ProjectsContext.Provider>;
};
export const useProjectsValue = () => useContext(ProjectsContext) as ProjectContextType;
