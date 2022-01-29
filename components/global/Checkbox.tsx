import { doc, DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { FC } from "react";
import { firestore } from "../../firebase";
type Props = {
	id: string;
};
const Checkbox: FC<Props> = ({ id }) => {
	const archivedTask = () => {
		const documentRef: DocumentReference<DocumentData> = doc(firestore, "tasks", id);
		setDoc(documentRef, { archived: true });
	};
	return (
		<button
			className="checkbox-holder"
			data-testid="checkbox-action"
			onClick={() => archivedTask()}
			onKeyDown={() => archivedTask()}
			aria-label="Archive Task"
		>
			<span className="checkbox" />
		</button>
	);
};

export default Checkbox;
