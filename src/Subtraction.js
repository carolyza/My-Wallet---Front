import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import dayjs from "dayjs";

export default function Subtraction() {
  const { user } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${user.token}` } };
  const [newvalue, setNew] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function Save(event) {
    event.preventDefault();
    const promise = axios.post(
      "http://localhost:5000/saida",
      {
        value: newvalue,
        description: description,
        date: dayjs().format("DD/MM"),
      },
      auth
    );

    promise.then(() => navigate("/principal"));
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
            <Button type="submit">
              <p>Salvar saída</p>
            </Button>
          </Footer>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #8c11be;
`;
const Headlist = styled.div`
  display: flex;
  margin-top: 25px;
  margin-bottom: 40px;
  margin-left: 25px;
  align-items: center;
  flex-direction: column;
  height: 31px;
  width: 168px;
  left: 24px;
  top: 25px;
  border-radius: nullpx;
  font-family: Raleway;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;
const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  ::placeholder {
    color: #000000;
  }
  border: none;
  display: flex;
  margin-bottom: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 58px;
  width: 326px;
  left: 25px;
  top: 96px;
  border-radius: 5px;
  background: #ffffff;
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  width: 326px;
  left: 25px;
  top: 238px;
  border-radius: 5px;
  background: #a328d6;
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;
