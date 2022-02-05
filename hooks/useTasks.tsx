import { useEffect, useState } from "react";
import type { Tasks } from "../@types";
import { taskCollectionRef } from "../firebase";
import { onSnapshot, Query, query, QueryConstraint, Unsubscribe, where } from "firebase/firestore";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import moment from "moment";
import { collatedTaskExist } from "../helpers";
import { useUserValue } from "../context";

const useTasks = (selectedProject: string | number) => {
	const [tasks, setTasks] = useState<Tasks[] | []>([]);
	const [archivedTasks, setArchivedTasks] = useState<Tasks[] | []>([]);
	const { user } = useUserValue();
	useEffect(() => {
		const fetchTasks = () => {
			const queryConsUserId: QueryConstraint = where("userId", "==", user?.uid);
			const queryConsProjectId: QueryConstraint = where("projectId", "==", selectedProject);
			const queryConsDate: QueryConstraint = where("date", "==", moment().format("DD/MM/YYYY"));
			let finalQuery: Query<DocumentData> = query(taskCollectionRef, queryConsUserId);
			if (selectedProject && !collatedTaskExist(selectedProject)) {
				finalQuery = query(taskCollectionRef, queryConsUserId, queryConsProjectId);
			}
			if (selectedProject == "TODAY") {
				finalQuery = query(taskCollectionRef, queryConsUserId, queryConsDate);
			} else if (selectedProject == "INBOX" || selectedProject === 0) {
				finalQuery = query(taskCollectionRef, queryConsUserId, where("date", "==", ""));
			}
			return finalQuery;
		};

		const unsubscribe: Unsubscribe = onSnapshot(fetchTasks(), (snapshot: QuerySnapshot<DocumentData>) => {
			const newTasks: Tasks[] = [];
			snapshot.forEach((doc) => {
				newTasks.push({ ...doc.data(), id: doc.id } as Tasks);
			});
			setTasks(
				selectedProject === "NEXT_7"
					? newTasks.filter(
							(task) =>
								moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 && task.archived !== true
					  )
					: newTasks.filter((task) => task.archived !== true)
			);
			setArchivedTasks(newTasks.filter((task) => task.archived !== false));
		});
		return () => {
			unsubscribe();
		};
	}, [selectedProject]);
	return { tasks, archivedTasks };
};

export default useTasks;
