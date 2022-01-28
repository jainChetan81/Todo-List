import moment from "moment";
import { Dispatch, FC, SetStateAction } from "react";
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from "react-icons/fa";

type Props = {
	setTaskDate: Dispatch<SetStateAction<string>>;
	showTaskDate: boolean;
	setShowTaskDate: Dispatch<SetStateAction<boolean>>;
};
const TaskDate: FC<Props> = ({ setTaskDate, showTaskDate = false, setShowTaskDate }) =>
	showTaskDate ? (
		<div className="task-date" data-testid="task-date-overlay">
			<ul className="task-date__list">
				<li
					onClick={() => {
						setShowTaskDate(false);
						setTaskDate(moment().format("DD/MM/YYYY"));
					}}
					data-testid="task-date-today"
				>
					<span>
						<FaSpaceShuttle />
					</span>
					<span>Today</span>
				</li>
				<li
					onClick={() => {
						setShowTaskDate(false);
						setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
					}}
					data-testid="task-date-tomorrow"
				>
					<span>
						<FaSun />
					</span>
					<span>Tomorrow</span>
				</li>
				<li
					onClick={() => {
						setShowTaskDate(false);
						setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
					}}
					data-testid="task-date-next-week"
				>
					<span>
						<FaRegPaperPlane />
					</span>
					<span>Next Week</span>
				</li>
			</ul>
		</div>
	) : null;

export default TaskDate;
