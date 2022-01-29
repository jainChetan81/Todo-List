import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import AddTasks from "./Tasks/AddTasks";
type Props = {
	darkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
};
const Header: FC<Props> = ({ darkMode, setDarkMode }) => {
	const [shouldShowMain, setShouldShowMain] = useState<boolean>(false);
	const [showQuickAddTask, setShowQuickAddTask] = useState<boolean>(false);
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todo Logo" />
				</div>
				<div className="settings">
					<ul>
						<li
							data-test-id="quick-add-task-action"
							className="settings__add"
							onClick={() => setShowQuickAddTask(!showQuickAddTask)}
						>
							+
						</li>
						<li
							data-test-id="dark-mode-action"
							className="settings__dark-mode"
							onClick={() => setDarkMode(!darkMode)}
						>
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
			<AddTasks
				showAddTaskMain={false}
				showShouldMain={shouldShowMain}
				showQuickAddTask={showQuickAddTask}
				setShowQuickAddTask={setShowQuickAddTask}
			/>
		</header>
	);
};

export default Header;
