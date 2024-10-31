import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SnackBars from "components/SnackBars";

interface BaseTemplateProps {
  children: ReactNode;
}

const BaseTemplate: FC<BaseTemplateProps> = ({ children }) => {
  return (
    <>
      <SnackBars />
      <Navbar />
        <div className={styles.content}>{children}</div>
      <Footer />
    </>
  );
};

export default BaseTemplate;
