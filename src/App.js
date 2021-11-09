import "./App.css";
import MyTable from "./MyTable/MyTable";

import { Provider } from "react-redux";
import { configureStore } from "./Redux/Store";

function App() {
  const Store = configureStore();
  return (
    <Provider store={Store}>
      <div className="App">
        <MyTable />
      </div>
    </Provider>
  );
}

export default App;
