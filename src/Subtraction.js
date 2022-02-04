import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";

export default function Subtraction() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [newvalue, setNew] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function Save(event) {
    event.preventDefault();
    const promise = axios.post(
      "http://localhost:5000",
      {
        value: newvalue,
        description: description,
      },
      auth
    );

    requisicao.then(() => navigate("/principal"));
    promise.catch((e) => {
      alert(e.response.data.message);
    });
  }

  return (
    <>
      <Container>
        <Headlist>
          <h2>Nova saída</h2>
        </Headlist>
        <form onSubmit={Save}>
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
          </List>
          <Footer>
            <Button type="submit" disabled={Loading}>
              <p>Salvar saída</p>
            </Button>
          </Footer>
        </form>
      </Container>
    </>
  );
}
