import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	DocumentReference,
	QueryConstraint,
	setDoc,
	where,
} from "firebase/firestore";
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
		<div className="checkbox-holder" data-testid="checkbox-action" onClick={() => archivedTask()}>
			<span className="checkbox" />
		</div>
	);
};

export default Checkbox;
