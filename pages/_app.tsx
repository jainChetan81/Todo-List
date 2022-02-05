import "../styles/globals.scss";
import "../styles/login.scss";
import "../styles/normalize.css";
import "emoji-mart/css/emoji-mart.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
