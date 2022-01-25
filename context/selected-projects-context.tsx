import { Context, createContext, useContext, useState } from "react";
import { ProjectContextType } from "../@types";

export const SelectedProjectsContext: Context<any> = createContext([[], () => {}]);
export const SelectedProjectsProvider = ({ children }: any): JSX.Element => {
	const [selectedProjects, setSelectedProjects] = useState<string>("INBOX");
	return (
		<SelectedProjectsContext.Provider value={{ selectedProjects, setSelectedProjects }}>
			{children}
		</SelectedProjectsContext.Provider>
	);
};
export const useSelectedProjectsValue = () => useContext(SelectedProjectsContext);
