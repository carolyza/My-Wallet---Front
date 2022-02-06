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

//CAROL FALTA FAZER NO RENDERbUYS ALGO PARA CALCULAR O SETTOTAL E CRIAR FUNCTION LOGOUT

export default function MainPage() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [nobuys, setnobuys] = useState("");
  const [buys, setBuys] = useState([]);
  const [total, setTotal] = useState("0,00");

  useEffect(() => {
    renderBuys();
  }, []);

  function CheckNull() {
    if (buys == []) {
      setnobuys("");
    }
  }

  function Logout() {
    console.log("bananinha");
  }

  function renderBuys() {
    const requisicao = axios.get("http://localhost:5000/extrato", auth);
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
          {/* <button onClick={() => Logout()}> */}
          <Img src={Image} onClick={() => Logout()} />
          {/* </button> */}
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
            <h2>SALDO</h2>
            <p>{total}</p>
          </Total>
        </List>
        <Footer>
          <Link to={"/entrada"}>
            <button>
              <Images src={Sum} />
              <p>Nova entrada</p>
            </button>
          </Link>
          <Link to={"/saida"}>
            <button>
              <Images src={Sub} />
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

const Images = styled.img`
  height: 21.875px;
  width: 21.875px;
  margin-left: 9px;
  margin-top: 10px;
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
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #8c11be;

  align-items: center;
`;

const Headlist = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 22px;
  margin-top: 25px;
  h2 {
    height: 31px;
    width: 141px;
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
  }
`;

const List = styled.div`
  height: 446px;
  width: 90%;
  margin-left: 24px;
  margin-right: 24px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  h1 {
    height: 46px;
    width: 180px;
    left: 98px;
    top: 278px;
    border-radius: nullpx;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #868686;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 29px;
  justify-content: center;
  width: 90%;
  align-items: center;
  gap: 15px;
  button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    height: 114px;
    width: 155px;
    left: 25px;
    top: 537px;
    border-radius: 5px;
    background: #a328d6;
  }
  p {
    text-decoration: none;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    height: 40px;
    width: 64px;
    left: 35px;
    top: 602px;
    border-radius: nullpx;
    color: #ffffff;
    margin-left: 9px;
    margin-bottom: 10px;
  }
`;

const Img = styled.img`
  height: 24px;
  width: 23px;
  left: 328px;
  top: 28px;
  border-radius: 0px;
  border: none;
`;

const Total = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 10px;

  h2 {
    margin-left: 15px;

    height: 20px;
    width: 57px;
    left: 40px;
    top: 494px;
    border-radius: nullpx;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  p {
    margin-right: 11px;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: right;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: right;
    color: #03ac00;
  }
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
