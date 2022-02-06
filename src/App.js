import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Main from "./MainPage.js";
import SignUp from "./SignUp.js";
import Sum from "./Sum.js";
import Subtraction from "./Subtraction.js";
import UserContext from "./Context.js";

import { useState } from "react";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastro" element={<SignUp />}></Route>
          <Route path="/principal" element={<Main />}></Route>
          <Route path="/entrada" element={<Sum />}></Route>
          <Route path="/saida" element={<Subtraction />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
