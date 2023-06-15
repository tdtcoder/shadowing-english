import { useState } from "react";
import "./App.css";
import { List, Typography } from "antd";
import FixedHeaderTable from "./FixedHeaderTable";

const App = (props) => {
    const [items, setItems] = useState(require("./final.json"));
    console.log("items", items.length);
    return (
        <div className="App">
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
