import Head from "next/head";
import PropTypes from "prop-types";
import { FC } from "react";
type LayoutType = {
	title: string;
	keywords?: string;
	description?: string;
	children?: any;
};
const Layout: FC<LayoutType> = ({ title, keywords, description, children }) => (
	<>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="manifest" href="manifest.json" />
		</Head>
		<div>
			<main>{children}</main>
		</div>
	</>
);
Layout.defaultProps = {
	description: "A Todo List to manage your tasks and projects",
	keywords: "NextJS, Firebase, Typescript, ContextAPI, PWA, PostCSS",
};
Layout.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	keywords: PropTypes.string,
};
export default Layout;
