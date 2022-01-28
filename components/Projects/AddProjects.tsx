import { addDoc } from "firebase/firestore";
import { ChangeEvent, FC, useState } from "react";
import { useProjectsValue } from "../../context";
import { projectCollectionRef } from "../../firebase";
import { generatePushId } from "../../helpers";

type Props = {
	shouldShow?: boolean;
};
const AddProjects: FC<Props> = ({ shouldShow = false }) => {
	const [show, setShow] = useState<boolean>(shouldShow);
	const [projectName, setProjectName] = useState<string>("");
	const projectId = generatePushId();
	const { projects, setProjects } = useProjectsValue();
	const addProject = () => {
		addDoc(projectCollectionRef, {
			projectId,
			name: projectName,
			userId: "UESs1wMq3aMShh6543F9",
		})
			.then(() => {
				setProjects([]);
				setProjectName("");
				setShow(false);
			})
			.catch((error: Error) => {
				console.error("error", error.message);
			});
	};
	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input">
					<input
						type="text"
						name="name"
						value={projectName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
						data-testid="project-name"
						className="add-project__name"
						placeholder="Name your project"
					/>
					<button className="add-project__submit" type="submit" onClick={() => addProject()}>
						Add Project
					</button>
					<span
						className="add-project__cancel"
						data-testid="hide-project__overlay"
						onClick={() => setShow(false)}
					>
						Cancel
					</span>
				</div>
			)}
			<span className="add-project__plus">+</span>
			<span data-testid="add-project-action" className="add-project__text" onClick={() => setShow(!show)}>
				Add Project
			</span>
		</div>
	);
};

export default AddProjects;
