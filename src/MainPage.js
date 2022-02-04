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

export default function MainPage() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [nobuys, setnobuys] = useState("");
  const [buys, setBuys] = useState([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    renderBuys();
  }, []);

  function CheckNull() {
    if (buys == []) {
      setnobuys("");
    }
  }

  function renderBuys() {
    const requisicao = axios.get("http://localhost:5000", auth);
    requisicao.then((r) => {
      setBuys(r.data);
      CheckNull();
    });
    requisicao.catch((e) => {
      console.log(e.response);
      setnobuys("hidden");
    });
  }

  return (
    <>
      <Container>
        <Headlist>
          <h2>Olá, {buys.name}</h2>
          <button onClick={() => Logout()}>
            <Img src={Image} />
          </button>
        </Headlist>
        <List>
          {buys.length === 0 ? (
            <h1 className={nobuys}>Não há registros de entrada ou saída</h1>
          ) : (
            buys.map((h) => (
              <Buy key={h.id}>
                <HeadBuy>
                  <p>{h.name}</p>
                  <p>{h.price}</p>
                </HeadBuy>
              </Buy>
            ))
          )}
          <Total>
            <p>SALDO</p>
            <p>{total}</p>
          </Total>
        </List>
        <Footer>
          <Link to={"/entrada"}>
            <button>
              <Img src={Sum} />
              <p>Nova entrada</p>
            </button>
          </Link>
          <Link to={"/saida"}>
            <button>
              <Img src={Sub} />
              <p>Nova saída</p>
            </button>
          </Link>
        </Footer>
      </Container>
    </>
  );
}

const HeadBuy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ion-icon {
    font-size: 15px;
    margin-top: 11px;
    margin-right: 10px;
  }
`;

const Buy = styled.div`
  margin-top: 20px;
  height: 91px;
  width: 100%;
  top: 147px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  p {
    margin-left: 15px;
    margin-top: 13px;
    margin-bottom: 8px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

const Container = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #e5e5e5;
`;

const Headlist = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  justify-content: space-between;

  h2 {
    font-family: Lexend Deca;
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126ba5;
  }

  button {
    height: 35px;
    width: 40px;
    background: #52b6ff;
    border: none;
    border-radius: 4.636363506317139px;
    font-family: Lexend Deca;
    font-size: 27px;
    font-style: normal;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
    margin-right: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const List = styled.div`
  margin-left: 17px;
  margin-right: 18px;
  margin-bottom: 106px;
  h1 {
    margin-top: 28px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
  .hidden {
    display: none;
    visibility: hidden;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 29px;
  justify-content: end;
  align-items: center;
  margin-right: 16px;
`;

const ButtonCancel = styled.button`
  background: none;
  border: none;
  height: 20px;
  width: 69px;
  left: 165px;
  top: 284px;
  font-family: Lexend Deca;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #52b6ff;
`;

const ButtonSave = styled.button`
  margin-left: 23px;
  border: none;
  height: 35px;
  width: 84px;
  left: 257px;
  top: 277px;
  border-radius: 4.636363506317139px;
  background: #52b6ff;
  font-family: Lexend Deca;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
`;

const Main = styled.div`
  margin-top: 20px;
  height: 180px;
  width: 100%;
  top: 147px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .hidden {
    display: none;
    visibility: hidden;
  }
`;
