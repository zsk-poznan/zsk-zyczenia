import useSWR from "swr";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Index() {
  const { data, error } = useSWR("http://localhost:2137/api/", fetcher, { refreshInterval: 2000 });


  return error ? (
    <Layout>{`Nie można pobrać danych. \n${error}`}</Layout>
  ) : (
    <Layout>
      {data?.map((wish: any) => {
        return (
          <div>
            <h1>{wish.zyczenie}</h1>
            <h2>{wish.nazwa}</h2>
          </div>
        );
      })}
    </Layout>
  );
}

export default Index;
