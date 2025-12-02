import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import useChange from "../../hooks/useChange";
import logo from "../../assets/untityLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkSessionValid } from "./api/checkSessionValid";
import { handleLoginSubmit } from "./api/handleLoginSubmit";

const Login = () => {
  const { inputValue, onChange } = useChange({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const sessionId = sessionStorage.getItem("sessionId");
      const session = await checkSessionValid(sessionId);

      if (session) {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen ">
      <div className="flex flex-col justify-start items-center md:border md:border-[#dcdcdc] dark:border-none md:dark:border-[#161b22] sm:p-8  rounded-2xl">
        <div className="w-48">
          <img className="object-cover" src={logo} alt="logo" />
        </div>
        <form
          onSubmit={(e) =>
            handleLoginSubmit(e, inputValue, () => {
              navigate("/", { replace: true });
            })
          }
          autoComplete="off"
          className="w-full sm:w-96 my-4 "
        >
          <Input
            value={inputValue.userId}
            id="userId"
            type="text"
            placeholder="아이디 입력"
            minLength={3}
            maxLength={16}
            onChange={(e) => onChange(e, "userId")}
          >
            아이디
          </Input>
          <Input
            value={inputValue.password}
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            minLength={3}
            maxLength={16}
            onChange={(e) => onChange(e, "password")}
          >
            비밀번호
          </Input>
          <Button type="submit" className="w-full my-2">
            로그인
          </Button>
        </form>
        <Link
          to="/createAccount"
          className="text-brand-sub text-sm hover:text-stone-400"
        >
          아직 계정이 없으신가요?
        </Link>
      </div>
    </div>
  );
};

export default Login;
