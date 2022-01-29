import { FC, useState } from "react";
import { Projects } from "../../@types";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import IndividualProject from "./IndividualProject";

type Props = {
	activeNull?: string;
};
const Projects: FC<Props> = ({ activeNull = null }) => {
	const [active, setActive] = useState<string | null>(activeNull);
	const { setSelectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();
	return projects && projects.length ? (
		<ul className="sidebar__projects">
			{projects.map((project: Projects) => (
				<li
					key={project.projectId}
					data-docid={project.docId}
					data-testid="project-action"
					className={`${active === project.projectId ? "active" : ""} sidebar__project`}
				>
					<button
						type="button"
						onClick={() => {
							setSelectedProject(project.projectId);
							setActive(project.projectId);
						}}
						onKeyDown={() => {
							setSelectedProject(project.projectId);
							setActive(project.projectId);
						}}
						aria-label={`Show ${project.name}'s Tasks`}
					>
						<IndividualProject project={project} />
					</button>
				</li>
			))}
		</ul>
	) : (
		<h2>No projects yet</h2>
	);
};

export default Projects;
