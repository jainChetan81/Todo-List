import { deleteDoc, doc } from "firebase/firestore";
import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Projects } from "../../@types";
import { useSelectedProjectValue } from "../../context";
import { projectCollectionRef } from "../../firebase";
import { useProjects } from "../../hooks";
type Props = {
	project: Projects;
};
const IndividualProject: FC<Props> = ({ project }) => {
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const { projects, setProjects } = useProjects();
	const { setSelectedProject } = useSelectedProjectValue();

	const deleteProject = (docId: string): void => {
		deleteDoc(doc(projectCollectionRef, docId)).then(() => {
			setProjects([...projects]);
			setSelectedProject("INBOX");
		});
	};
	return (
		<>
			<span className="sidebar__project-name">{project.name}</span>
			<li
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}
				onKeyDown={() => setShowConfirm(!showConfirm)}
				aria-label="Delete Project"
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
				role="button"
				tabIndex={0}
			>
				<FaTrash />{" "}
				{showConfirm && (
					<div className="project-delete-modal">
						<div className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project?</p>
							<button
								type="button"
								onClick={() => deleteProject(project.docId)}
								aria-label="Confirm Delete"
							>
								Delete
							</button>
							<button onClick={() => setShowConfirm(!showConfirm)} aria-label="Cancel Delete">
								Cancel
							</button>
						</div>
					</div>
				)}
			</li>
		</>
	);
};

export default IndividualProject;
