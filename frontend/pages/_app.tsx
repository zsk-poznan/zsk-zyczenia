import Head from "next/head";
import "../components/styles/styles.scss";

function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Tadeusz Piechowiak</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;