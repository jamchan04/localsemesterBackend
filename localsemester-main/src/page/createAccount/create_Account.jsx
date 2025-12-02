import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import useChange from "../../hooks/useChange";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/untityLogo.png";
import dayjs from "dayjs";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/modal/modal";
import { CreateAccountModal } from "./components/modal";
import { validateInput } from "../../util/vaildinput";

export const CreateAccount = () => {
  const { inputValue, setInputValue, onChange } = useChange({
    username: "",
    email: "",
    userId: "",
    checkedId: true,
    checkedEmail: true,
    emailValid: true,
    password: "",
    checkPassword: "",
  });
  const navigate = useNavigate();
  const { isModal, openModal, closeModal } = useModal();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      inputValue.username.length < 1 ||
      inputValue.userId.length < 4 ||
      inputValue.password.length < 4
    ) {
      alert("회원가입 정보를 정확하게 입력해주세요.");
      return;
    }

    if (
      !inputValue.email ||
      !validateInput("email", inputValue.email.trim())
    ) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!inputValue.checkedEmail) {
      alert("이미 사용 중인 이메일입니다.");
      return;
    }

    if (!inputValue.checkedId) {
      alert("이미 사용 중인 아이디입니다.");
      return;
    }

    if (inputValue.password !== inputValue.checkPassword) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const createAccount = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputValue.username,
        email: inputValue.email,
        userId: inputValue.userId,
        password: inputValue.password,
        state: 1,
        createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        profilePhoto: "",
        message: "",
      }),
    });
    const res = await createAccount.json();
    console.log(res);

    if (typeof res.id === "number") {
      openModal();
    } else {
      alert("회원가입 정보를 확인해주세요.");
    }
  };

  const checkId = (e) => {
    onChange(e, "userId");
    const id = e.target.value;

    fetch(`http://localhost:5000/user?userId=${id}`)
      .then((data) => data.json())
      .then((response) => {
        if (response.length > 0) {
          setInputValue((state) => {
            return {
              ...state,
              checkedId: false,
            };
          });
        } else {
          setInputValue((state) => {
            return {
              ...state,
              checkedId: true,
            };
          });
        }
      });
  };

  const checkEmail = (e) => {
    const email = e.target.value.trim();

    setInputValue((state) => ({
      ...state,
      email,
    }));

    if (!email) {
      setInputValue((state) => ({
        ...state,
        emailValid: true,
        checkedEmail: true,
      }));
      return;
    }

    const isValid = validateInput("email", email);
    setInputValue((state) => ({
      ...state,
      emailValid: isValid,
      checkedEmail: isValid ? state.checkedEmail : true,
    }));

    if (!isValid) return;

    fetch(`http://localhost:5000/user?email=${email}`)
      .then((data) => data.json())
      .then((response) => {
        setInputValue((state) => {
          return {
            ...state,
            checkedEmail: response.length === 0,
          };
        });
      })
      .catch(() => {
        setInputValue((state) => ({
          ...state,
          checkedEmail: true,
        }));
      });
  };

  const modalHandler = () => {
    navigate("/login", { replace: true });
    closeModal();
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center ">
      {isModal && (
        <Modal closeModal={closeModal} className="p-10">
          <CreateAccountModal value={inputValue} onClick={modalHandler} />
        </Modal>
      )}
      <div className="w-48 mb-4">
        <img className="object-cover" src={logo} alt="logo" />
      </div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="w-96"
      >
        <h1 className="text-brand font-bold text-3xl my-8 ml-2 dark:text-brand-dark">
          회원가입
        </h1>
        <Input
          value={inputValue.username}
          className="bg-[#ededed] border-none"
          onChange={(e) => onChange(e, "username")}
        >
          이름
        </Input>
        <Input
          value={inputValue.userId}
          className="bg-[#ededed] border-none"
          onChange={(e) => checkId(e)}
          error={!inputValue.checkedId}
          message="이미 사용중인 아이디입니다."
        >
          아이디
        </Input>
        <Input
          value={inputValue.email}
          className="bg-[#ededed] border-none"
          onChange={(e) => checkEmail(e)}
          type="email"
          error={!inputValue.emailValid || !inputValue.checkedEmail}
          message={
            !inputValue.emailValid
              ? "올바른 이메일 형식이 아닙니다."
              : "이미 사용 중인 이메일입니다."
          }
        >
          이메일
        </Input>
        <Input
          value={inputValue.password}
          className="bg-[#ededed] border-none"
          onChange={(e) => onChange(e, "password")}
          type="password"
        >
          비밀번호
        </Input>
        <Input
          value={inputValue.checkPassword}
          className="bg-[#ededed] border-none "
          onChange={(e) => onChange(e, "checkPassword")}
          type="password"
        >
          비밀번호 확인
        </Input>
        <Button type="submit" className="w-full my-2">
          회원가입
        </Button>
      </form>
      <Link
        to="/login"
        className="text-brand-sub text-sm hover:text-stone-400 mt-2"
      >
        이미 계정이 있으신가요?
      </Link>
    </div>
  );
};
