import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";
import useChange from "../../../hooks/useChange";
import { useEffect, useState } from "react";
import { checkAuth, clearSession } from "../../../auth/auth";
import { useNavigate } from "react-router-dom";

export const ChangeLoginInfModal = ({ id, changeId }) => {
  const { inputValue, onChange } = useChange({
    userId: "",
    password: "",
    value: "",
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const content = changeId
    ? {
        title: "아이디 변경",
        article: "아이디를 변경하시고 다시 로그인 해주세요.",
        placeholder: "사용하시는 아이디와 비밀번호를 입력해주세요",
        body: { userId: inputValue.value },
      }
    : {
        title: "비밀번호 변경",
        article: "비밀번호를 변경하시고 다시 로그인 해주세요.",
        placeholder: "사용하시는 아이디와 비밀번호를 입력해주세요",
        body: { password: inputValue.value },
      };

  const checkUserInf = async () => {
    const session = await checkAuth();
    if (!session) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const req = await fetch(`/user/${id}`);
      const res = await req.json();

      if (
        res.userId === inputValue.userId &&
        res.password === inputValue.password
      ) {
        setChecked(true);
      } else {
        alert("회원정보가 틀립니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    if (inputValue.value.length < 3) {
      return;
    }
    if (error) {
      return;
    }

    try {
      await fetch(`/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content.body),
      });
    } catch (error) {
      console.error(error);
    } finally {
      await clearSession();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    setError(false);

    const controller = new AbortController();
    const signal = controller.signal;

    const checkId = async () => {
      try {
        const req = await fetch(`/user?userId=${inputValue.value}`, { signal });
        const res = await req.json();
        if (res.length === 1) {
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkId();

    return () => controller.abort();
  }, [inputValue.value]);

  return (
    <div className="min-w-96">
      <p className="text-2xl text-center text-brand dark:text-brand-dark font-bold mb-4">
        {content.title}
      </p>

      {checked ? (
        <>
          <p className="mb-4 text-sm text-brand-sub text-center">
            {content.placeholder}
          </p>
          <Input
            value={inputValue.value}
            onChange={(e) => onChange(e, "value")}
            placeholder={changeId ? "아이디" : "비밀번호"}
            error={error}
            className="mb-2"
            message={"이미 존재하는 아이디입니다."}
          >
            {changeId ? "아이디" : "비밀번호"}
          </Input>
          <Button onClick={onClick}>변경하기</Button>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm text-brand-sub text-center">
            {content.placeholder}
          </p>
          <Input
            value={inputValue.userId}
            onChange={(e) => onChange(e, "userId")}
            placeholder="아이디"
            minLength={3}
          >
            아이디
          </Input>
          <Input
            value={inputValue.password}
            onChange={(e) => onChange(e, "password")}
            placeholder="비밀번호"
            minLength={3}
            className="mb-4"
          >
            비밀번호
          </Input>
          <Button onClick={checkUserInf}>확인하기</Button>
        </>
      )}
    </div>
  );
};
