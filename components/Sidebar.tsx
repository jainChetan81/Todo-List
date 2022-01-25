import { FC, useState } from "react";
import { FaChevronDown, FaInbox, FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { Projects } from ".";
import { useSelectedProjectsValue } from "../context";

const Sidebar: FC = () => {
	const { setSelectedProject } = useSelectedProjectsValue();
	const [active, setActive] = useState<string>("inbox");
	const [showProjects, setShowProjects] = useState<boolean>(true);
	return (
		<aside className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li data-testid="inbox" className="inbox">
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li data-testid="today" className="today">
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li data-testid="next_7" className="next_7">
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
			<div className="sidebar__middle">
				<span>
					<span>
						<FaChevronDown />
					</span>
					<h2>Projects</h2>
				</span>
			</div>
			<ul className="sidebar__projects">Projects will be here</ul>
			{/* TODO: Add Project components here */}
			{showProjects && <Projects />}
		</aside>
	);
};

export default Sidebar;
