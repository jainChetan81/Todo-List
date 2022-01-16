import type { FC } from "react";
import { FaChevronDown, FaInbox, FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";

const Sidebar: FC = () => {
	return (
		<aside className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li>
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li>
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li>
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
			<div className="sidebar__middle">
				<span>
					<FaChevronDown />
					<h2>Projects</h2>
				</span>
			</div>
			<ul className="sidebar__projects">Projects will be here</ul>
			{/* TODO: Add Project components here */}
		</aside>
	);
};

export default Sidebar;
