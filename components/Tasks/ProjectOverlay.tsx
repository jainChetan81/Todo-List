import { Dispatch, FC, SetStateAction } from "react";
import { Projects } from "../../@types";
import { useProjectsValue } from "../../context";
type Props = {
	setProject: Dispatch<SetStateAction<string>>;
	showProjectOverlay: boolean;
	setShowProjectOverlay: Dispatch<SetStateAction<boolean>>;
};
const ProjectOverlay: FC<Props> = ({ setProject, showProjectOverlay, setShowProjectOverlay }) => {
	const { projects } = useProjectsValue();

	return projects && showProjectOverlay ? (
		<div className="project-overlay" data-testid="project-overlay">
			<ul className="project-overlay__list">
				{projects.map((project: Projects) => (
					<li
						key={project.projectId}
						data-testid="project-overlay-action"
						onClick={() => {
							setProject(project.projectId);
							setShowProjectOverlay(false);
						}}
					>
						{project.name}
					</li>
				))}
			</ul>
		</div>
	) : null;
};

export default ProjectOverlay;
