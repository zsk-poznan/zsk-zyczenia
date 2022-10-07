import LayoutStyles from "./Layout.module.scss";

type Props = {
  children: React.ReactNode | string;
};

function Layout({ children }: Props) {
  return (
    <div className={LayoutStyles.container}>
      <div className={LayoutStyles.wrapper}>{children}</div>
    </div>
  );
}

export default Layout;
