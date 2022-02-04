import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import Image from "./Images/vector.png";
import Sum from "./Images/plus.png";
import Sub from "./Images/minos.png";

//CAROL FALTA FAZER NO RENDERbUYS ALGO PARA CALCULAR O SETTOTAL

export default function Buys() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [nobuys, setnobuys] = useState("");
  const [buys, setBuys] = useState([]);
  const [total, setTotal] = useState("");
  const [newvalue, setNew] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Container>
        <Headlist>
          <h2>Nova entrada</h2>
        </Headlist>
        <List>
          <Input
            type="text"
            onChange={(e) => setNew(e.target.value)}
            value={newvalue}
            placeholder=" Valor"
          ></Input>
          <Input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder=" Descrição"
          ></Input>
          <Total>
            <p>SALDO</p>
            <p>{total}</p>
          </Total>
        </List>
        <Footer>
          <Link to={"/principal"}>
            <button onClick={() => Save()}>
              <p>Salvar entrada</p>
            </button>
          </Link>
        </Footer>
      </Container>
    </>
  );
}
