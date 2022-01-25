import { useEffect } from "react";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return <Component {...pageProps} />;
};

export default MyApp;
