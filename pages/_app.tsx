import "../styles/globals.scss";
import "../styles/normalize.css";
import "emoji-mart/css/emoji-mart.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
