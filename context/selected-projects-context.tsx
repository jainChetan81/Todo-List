import { Context, createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
export const SelectedProjectContext: Context<any> = createContext([[], () => {}]);
export const SelectedProjectProvider = ({ children }: any): JSX.Element => {
	const [selectedProject, setSelectedProject] = useState<string>("INBOX");

	return (
		<SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
			{children}
		</SelectedProjectContext.Provider>
	);
};
export const useSelectedProjectValue = () => useContext(SelectedProjectContext);

SelectedProjectProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
