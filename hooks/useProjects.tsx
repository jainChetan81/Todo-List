import { Unsubscribe } from "@firebase/util";
import {
	DocumentData,
	onSnapshot,
	orderBy,
	Query,
	query,
	QueryConstraint,
	QueryDocumentSnapshot,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Projects } from "../@types";
import { projectCollectionRef } from "../firebase";

const useProjects = () => {
	const [projects, setProjects] = useState<Projects[] | []>([]);
	useEffect(() => {
		const queryConsUserId: QueryConstraint = where("userId", "==", "G3eOFfoP0iZ233123");
		const queryByProjects: QueryConstraint = orderBy("projectId", "asc");
		const finalQuery: Query<DocumentData> = query(projectCollectionRef, queryConsUserId, queryByProjects);
		const unsubscribe: Unsubscribe = onSnapshot(finalQuery, (snapshot: QuerySnapshot<DocumentData>) => {
			const docs: Projects[] = [];
			snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				docs.push({ docId: doc.id, ...doc.data() } as Projects);
			});
			if (JSON.stringify(projects) !== JSON.stringify(docs)) {
				console.log("docs", docs);
				setProjects(docs);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [projects]);
	return { projects, setProjects };
};

export default useProjects;
