import { addDoc } from "firebase/firestore";
import { FC, FormEvent, useState } from "react";
import { Input } from "..";
import { Projects } from "../../@types";
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
	const addProject = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addDoc(projectCollectionRef, {
			projectId,
			name: projectName,
			userId: "UESs1wMq3aMShh6543F9",
		})
			.then(() => {
				setProjects([
					...projects,
					{ projectId, name: projectName, userId: "UESs1wMq3aMShh6543F9" } as Projects,
				]);
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
				<form className="add-project__input" onSubmit={(e: FormEvent<HTMLFormElement>) => addProject(e)}>
					<Input message={projectName} testid="project-name" setMessage={setProjectName} />
					<button
						className="add-project__submit"
						type="submit"
						aria-label="Add Project"
						// onClick={addProject}
					>
						Add Project
					</button>
					<button
						type="button"
						className="add-project__cancel"
						onClick={() => setShow(false)}
						onKeyDown={() => setShow(false)}
						data-testid="hide-project__overlay"
						aria-label="Cancel Adding project"
					>
						Cancel
					</button>
				</form>
			)}
			<button
				type="button"
				onClick={() => setShow(true)}
				onKeyDown={() => setShow(true)}
				aria-label="Add Project"
			>
				<span className="add-project__plus">+</span>
				<span data-testid="add-project-action" className="add-project__text">
					Add Project
				</span>
			</button>
		</div>
	);
};

export default AddProjects;
