import { deleteDoc, doc } from "firebase/firestore";
import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Projects } from "../../@types";
import { useSelectedProjectsValue } from "../../context";
import { projectCollectionRef } from "../../firebase";
import { useProjects } from "../../hooks";
type Props = {
	project: Projects;
};
const IndividualProject: FC<Props> = ({ project }) => {
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const { projects, setProjects } = useProjects();
	const { setSelectedProjects } = useSelectedProjectsValue();

	const deleteProject = (docId: string): void => {
		deleteDoc(doc(projectCollectionRef, docId)).then(() => {
			setProjects([...projects]);
			setSelectedProjects("INBOX");
		});
	};
	return (
		<>
			<span className="sidebar__dot">.</span>
			<span className="sidebar__project-name">{project.name}</span>
			<span
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}
				onKeyDown={() => setShowConfirm(!showConfirm)}
			>
				<FaTrash />{" "}
				{showConfirm && (
					<div className="project-delete-modal">
						<div className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project?</p>
							<button type="button" onClick={() => deleteProject(project.docId)}>
								Delete
							</button>{" "}
							<span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
						</div>
					</div>
				)}
			</span>
		</>
	);
};

export default IndividualProject;
