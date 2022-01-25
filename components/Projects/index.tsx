import { FC, useState } from "react";
import { Projects } from "../../@types";
import { useProjectsValue, useSelectedProjectsValue } from "../../context";
import IndividualProject from "./IndividualProject";

type Props = {
	activeNull?: string;
};
const Projects: FC<Props> = ({ activeNull = null }) => {
	const [active, setActive] = useState<string | null>(activeNull);
	const { setSelectedProjects } = useSelectedProjectsValue();
	const { projects } = useProjectsValue();
	return projects && projects.length ? (
		<ul className="sidebar__projects">
			{projects.map((project: Projects) => (
				<li
					key={project.projectId}
					data-docid={project.docId}
					data-testid="project-action"
					className={`${active === project.projectId ? "active" : ""} sidebar__project`}
					onClick={() => {
						setSelectedProjects(project.projectId);
						setActive(project.projectId);
					}}
					onKeyDown={() => {
						setSelectedProjects(project.projectId);
						setActive(project.projectId);
					}}
				>
					<IndividualProject project={project} />
				</li>
			))}
		</ul>
	) : (
		<h2>No projects yet</h2>
	);
};

export default Projects;
