import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Logo from "./Images/MyWallet.png";

export default function SignUp() {
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPass, setnewPass] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function Send(event) {
    setLoading(true);
    event.preventDefault();

    if (password == newPass) {
      const requisicao = axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      requisicao.then(() => navigate("/"));

      requisicao.catch(() => {
        alert("Houve algum erro, tente novamente");
        setLoading(false);
      });
    } else {
      alert("As senhas não conferem");
      setLoading(false);
    }
  }

  return (
    <Container>
      <header>
        <Imagem src={Logo}></Imagem>
      </header>
      <form onSubmit={Send}>
        <Main>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder=" Nome"
            disabled={Loading}
          ></Input>
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

          <Input
            type="password"
            onChange={(e) => setnewPass(e.target.value)}
            value={newPass}
            placeholder=" Confirme a senha"
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
              "Cadastrar"
            )}
          </Button>

          <StyleLink to="/">Já tem uma conta? Entre agora!</StyleLink>
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
  margin-top: 95px;
  margin-bottom: 28px;
`;
const Input = styled.input`
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
  margin-bottom: 32px;
`;
const StyleLink = styled(Link)`
  font-family: Raleway;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  height: 18px;
  width: 227px;
  left: 74px;
  top: 535px;
  border-radius: nullpx;

  color: #ffffff;
`;
