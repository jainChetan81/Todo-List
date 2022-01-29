import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="manifest" href="/manifest.json" />

					<link rel="shortcut icon" href="https://ik.imagekit.io/clhowstalgz/chetan?tr=w-200,h-200,r-100" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://thechetanjain.in" />
					<meta name="twitter:title" content="Todo List" />
					<meta name="twitter:description" content="A Todo List to manage your tasks and projects" />
					<meta name="twitter:image" content="https://ik.imagekit.io/clhowstalgz/chetan?tr=w-200,h-200" />
					<meta name="twitter:creator" content="@jainChetan81" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Todo List" />
					<meta property="og:description" content="A Todo List to manage your tasks and projects" />
					<meta property="og:site_name" content="Todo List" />
					<meta property="og:url" content="https://thechetanjain.in" />
					<meta property="og:image" content="https://ik.imagekit.io/clhowstalgz/chetan?tr=w-200,h-200" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
