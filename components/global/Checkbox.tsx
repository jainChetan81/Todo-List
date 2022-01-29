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
		<div
			className="checkbox-holder"
			data-testid="checkbox-action"
			role="button"
			onClick={() => archivedTask()}
			onKeyDown={() => archivedTask()}
			tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	);
};

export default Checkbox;
