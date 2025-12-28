'use client';

import { setCookie } from "cookies-next";
import { useState } from "react";

interface TabBarProps {
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1,2,3,4,5] }: TabBarProps) => {

   const [selectedTab, setSelectedTab] = useState<number>(currentTab);

   const handleTabChange = (tab: number) => {
     setSelectedTab(tab);
     setCookie('selectedTab', tab.toString());
   }
  
  return (
    <div className={`grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2`}>
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            checked={selectedTab === tab}
            onChange={() => {}}
            className="peer hidden"
            name="tab-bar"
          />
          <label
            onClick={() => handleTabChange(tab)}
            htmlFor={tab.toString()}
            className="transiti>on-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
