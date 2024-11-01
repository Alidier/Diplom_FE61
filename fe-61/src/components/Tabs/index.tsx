import { useState } from "react";
import Button from "../Button";
import styles from "./styles.module.scss"



const getDefaultTab = (tabs: { default?: boolean; id: number }[]) => {
  return tabs.find((tab) => tab.default)?.id ?? tabs[0].id;
};

type Tab = {
  id: number,
  label: string,
}

interface TabsProps {
  tabs: Tab[]
  onChangeTab?: (id: number) => void
}

export default function Tabs({ tabs, onChangeTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const onClickTab = (id: number) => () => {
    setActiveTab(id);
    onChangeTab?.(id);
  };

  return (
    <div className={styles.tabs__wrapper}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={onClickTab(tab.id)}
          disabled={tab.id === activeTab}
          className={"tab"}
        >
          {tab.label}
        </Button>
      ))}
    </div> 
  );
}
