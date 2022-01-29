import { doc, DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { FC } from "react";
import { firestore } from "../../firebase";
type Props = {
	id: string;
	archived: boolean;
};
const Checkbox: FC<Props> = ({ id, archived: defaultArchived }) => {
	const archivedTask = () => {
		const documentRef: DocumentReference<DocumentData> = doc(firestore, "tasks", id);
		updateDoc(documentRef, { archived: !defaultArchived });
	};
	return (
		<input
			type="checkbox"
			name={`checkbox-${id}`}
			id={`checkbox-${id}`}
			onChange={() => archivedTask()}
			onKeyDown={() => archivedTask()}
			defaultChecked={defaultArchived}
			aria-label="Archive Task"
			className="checkbox-holder"
			data-testid="checkbox-action"
		/>
	);
};

export default Checkbox;
