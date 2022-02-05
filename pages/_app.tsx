import "../styles/globals.scss";
import "../styles/normalize.css";
import "emoji-mart/css/emoji-mart.css";
import type { AppProps } from "next/app";
import { ProjectsProvider, SelectedProjectProvider, UserProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<SelectedProjectProvider>
				<ProjectsProvider>
					<Component {...pageProps} />
				</ProjectsProvider>
			</SelectedProjectProvider>
		</UserProvider>
	);
}

export default MyApp;
