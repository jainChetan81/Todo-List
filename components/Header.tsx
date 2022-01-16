import type { FC } from "react";
import { FaPizzaSlice } from "react-icons/fa";
const Header: FC = () => {
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todo List" />
				</div>
				<div className="settings">
					<ul>
						<li>+</li>
						<li>
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
