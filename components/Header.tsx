import type { FC } from "react";
import { FaPizzaSlice } from "react-icons/fa";
const Header: FC = () => {
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todo Logo" />
				</div>
				<div className="settings">
					<ul>
						<li data-test-id="quick-add-task-action" className="settings__add">
							+
						</li>
						<li data-test-id="dark-mode-action" className="settings__dark-mode">
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
