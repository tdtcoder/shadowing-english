import { useState } from "react";
import "./App.css";
import FixedHeaderTable from "./FixedHeaderTable";
import LogoIcon from "./logo.png";
const App = (props) => {
    const [items, setItems] = useState(require("./read.json"));
    return (
        <div className="App">
            <div className="flex flex-col items-center p-1">
                <img className="w-[36px] h-[36px]" src={LogoIcon} />
                <div className="text-sm font-bold">Shadowing English App</div>
            </div>
            <FixedHeaderTable
                items={items.map((item, index) => ({
                    ...item,
                    index: index + 1,
                }))}
            />
        </div>
    );
};

export default App;
