"use client"
import React, { useState } from 'react';

interface Tab {
    title: string;
    content: JSX.Element;
}

interface TabsProps {
    tabPanel: Tab[];
}

export default function Tabber({ tabPanel }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full h-full my-5">
            {/* Tabs Navigation */}
            <div className="flex justify-between border-b border-gray-300 items-center w-full">
                {tabPanel.map((tab, index) => (
                    <div
                        key={index}
                        className={`flex-1 py-2 mx-4 text-center text-sm font-medium transition-colors duration-300 ${activeTab === index
                            ? 'bgorangegrad'
                            : 'bggraygrad text-gray-500 hover:text-gray-200 hover:text-orange-500'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 w-full">
                {tabPanel[activeTab] && tabPanel[activeTab].content}
            </div>
        </div>
    )
}

// Example Usage
// const tabPanel = [
//   { title: 'Tab 1', content: <div>Content for Tab 1</div> },
//   { title: 'Tab 2', content: <div>Content for Tab 2</div> },
//   { title: 'Tab 3', content: <div>Content for Tab 3</div> },
// ];
// <Tabs tabPanel={tabPanel} />
