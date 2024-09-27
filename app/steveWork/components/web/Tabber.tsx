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
        <div className="w-full h-full">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-300">
                {tabPanel.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-1 py-2 text-center text-sm font-medium transition-colors duration-300 ${activeTab === index
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-gray-500 hover:text-blue-500'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {tabPanel[activeTab] && tabPanel[activeTab].content}
            </div>
        </div>
    );
};

// Example Usage
// const tabPanel = [
//   { title: 'Tab 1', content: <div>Content for Tab 1</div> },
//   { title: 'Tab 2', content: <div>Content for Tab 2</div> },
//   { title: 'Tab 3', content: <div>Content for Tab 3</div> },
// ];
// <Tabs tabPanel={tabPanel} />
