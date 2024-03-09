import './App.css';
import {Provider} from "react-redux";
import {store} from "./Store/redux-store.ts";
import {Home} from "./pages/Home.tsx";

function App() {
  return (
    <Provider store={store}>
        <Home></Home>
    </Provider>
  )
}

export default App
