import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import { ThreeDots } from "react-loader-spinner";
import Logo from "./Images/MyWallet.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const { user, setUser } = useContext(Context);

  const navigate = useNavigate();

  function MakeLogin(event) {
    setLoading(true);

    event.preventDefault();
    const requisicao = axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    });

    requisicao.then((r) => {
      setUser(r.data);
      localStorage.setItem("last-user", JSON.stringify(r.data));
      console.log(user);
      navigate("/principal");
    });
    requisicao.catch((e) => {
      alert("Login ou senha não correspondem, tente novamente.");
      setLoading(false);
    });
  }

  return (
    <Container>
      <header>
        <Imagem src={Logo}></Imagem>
      </header>
      <form onSubmit={MakeLogin}>
        <Main>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=" E-mail"
            disabled={Loading}
          ></Input>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder=" Senha"
            disabled={Loading}
          ></Input>
        </Main>
        <Footer>
          <Button type="submit" disabled={Loading}>
            {Loading ? (
              <ThreeDots
                color="#FFFFFF"
                height={13}
                width={51}
                timeout={3000}
              />
            ) : (
              "Entrar"
            )}
          </Button>

          <StyleLink to="/cadastro">Primeira vez? Cadastre-se!</StyleLink>
        </Footer>
      </form>
    </Container>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #8c11be;
  overflow: hidden;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Imagem = styled.img`
  margin-top: 159px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  ::placeholder {
    color: #000000;
  }
  border: none;
  height: 58px;
  width: 326px;
  left: 25px;
  top: 233px;
  border-radius: 5px;
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
  margin-bottom: 13px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 46px;
  width: 326px;
  left: 23px;
  top: 375px;
  border-radius: 5px;
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  background: #a328d6;
  color: #ffffff;
  margin-bottom: 36px;
`;
const StyleLink = styled(Link)`
  text-decoration: none;
  height: 18px;
  width: 191px;
  left: 92px;
  top: 457px;
  border-radius: nullpx;
  font-family: Raleway;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
`;
