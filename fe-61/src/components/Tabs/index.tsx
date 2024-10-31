import { useState } from "react";
import Button from "../Button";



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
    <div>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={onClickTab(tab.id)}
          disabled={tab.id === activeTab}
        >
          {tab.label}
        </Button>
      ))}
    </div> 
  );
}
