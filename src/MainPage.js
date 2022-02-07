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

export default function MainPage() {
  const { user, setUser } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${user.token}` } };
  const [nobuys, setnobuys] = useState("");
  const [buys, setBuys] = useState([]);
  const [total, setTotal] = useState("0,00");
  let arrayValue = [];
  let arrayNegative = [];
  const navigate = useNavigate();

  useEffect(() => {
    renderBuys();
  }, []);

  function CheckNull() {
    if (buys == []) {
      setnobuys("");
    }
  }

  function Logout() {
    if (window.confirm("Tem certeza que quer sair?")) {
      localStorage.setItem("last-user", null);
      setUser(null);
      navigate("/");
    }
  }

  function ChangeTotal() {
    let sum = 0;
    let sub = 0;
    for (let x = 0; x < arrayValue.length; x++) {
      sum = sum + parseFloat(arrayValue[x]);
    }
    for (let y = 0; y < arrayNegative.length; y++) {
      sub = sub + parseFloat(arrayNegative[y]);
    }
    setTotal(sum - sub);
  }

  function renderBuys() {
    const requisicao = axios.get("http://localhost:5000/entrada", auth);
    requisicao.then((r) => {
      console.log(r.data);
      console.log(buys);
      setBuys(r.data);
      CheckNull();
      console.log(r.data);
      console.log(buys);

      for (let i = 0; i < r.data.length; i++) {
        arrayValue.push(r.data[i].value);
      }
      ChangeTotal();
      console.log(arrayValue);
    });
    requisicao.catch((e) => {
      console.log(e.response);
      setnobuys("hidden");
    });

    const promise = axios.get("http://localhost:5000/saida", auth);
    promise.then((r) => {
      setBuys(r.data);
      CheckNull();
      for (let i = 0; i < r.data.length; i++) {
        arrayNegative.push(r.data[i].value);
      }
      ChangeTotal();
      console.log(arrayNegative);
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
          <h2>Olá, {user.name}</h2>

          <Img src={Image} onClick={() => Logout()} />
        </Headlist>
        <List>
          <ListBuy>
            {buys.length === 0 ? (
              <h1 className={nobuys}>Não há registros de entrada ou saída</h1>
            ) : (
              buys.map((h) => (
                <Buy>
                  <HeadBuy>
                    <p>{h.date}</p>
                    <p>{h.description}</p>
                    <p>{h.value}</p>
                  </HeadBuy>
                </Buy>
              ))
            )}
          </ListBuy>
          <Total>
            <h2>SALDO</h2>
            <p className={total >= 0 ? "green" : "red"}>{total}</p>
          </Total>
        </List>
        <Footer>
          <StyleLink to={"/entrada"}>
            <button>
              <Images src={Sum} />
              <p>Nova entrada</p>
            </button>
          </StyleLink>
          <StyleLink to={"/saida"}>
            <button>
              <Images src={Sub} />
              <p>Nova saída</p>
            </button>
          </StyleLink>
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

const ListBuy = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  flex-direction: column;
  left: 12px;
  width: 90%;
`;

const Buy = styled.div`
  margin-top: 20px;
  height: 20px;
  width: 100%;
  top: 147px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  p {
    margin-left: 15px;
    margin-top: 13px;
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

  justify-content: space-between;

  width: 90%;
  margin-bottom: 22px;
  margin-top: 25px;
  h2 {
    height: 31px;

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

const StyleLink = styled(Link)`
  text-decoration: none;
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
  }
  .green {
    color: #03ac00;
  }
  .red {
    color: #de3131;
  }
`;
