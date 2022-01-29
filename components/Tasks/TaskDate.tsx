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
				<li>
					<button
						data-testid="task-date-today"
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate(moment().format("DD/MM/YYYY"));
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate(moment().format("DD/MM/YYYY"));
						}}
					>
						<span>
							<FaSpaceShuttle />
						</span>
						<span>Today</span>
					</button>
				</li>
				<li>
					<button
						data-testid="task-date-tomorrow"
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
						}}
					>
						<span>
							<FaSun />
						</span>
						<span>Tomorrow</span>
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							setShowTaskDate(false);
							setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
						}}
						onKeyDown={() => {
							setShowTaskDate(false);
							setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
						}}
						data-testid="task-date-next-week"
					>
						<span>
							<FaRegPaperPlane />
						</span>
						<span>Next Week</span>
					</button>
				</li>
			</ul>
		</div>
	) : null;

export default TaskDate;
