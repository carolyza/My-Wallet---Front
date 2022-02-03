import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastro" element={<SignUp />}></Route>
          <Route path="/principal" element={<Today />}></Route>
          <Route path="/entrada" element={<Habits />}></Route>
          <Route path="/saida" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
