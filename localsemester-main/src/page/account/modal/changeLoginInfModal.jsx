import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";
import useChange from "../../../hooks/useChange";
import { clearSession } from "../../../auth/auth";

export const ChangeLoginInfModal = ({ id, changeId }) => {
  const { inputValue, onChange } = useChange({
    userId: "",
    password: "",
    value: "",
  });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const content = changeId
    ? {
        title: "아이디 변경",
        placeholder: "새 아이디를 입력해주세요",
        body: { userId: inputValue.value.trim() },
      }
    : {
        title: "비밀번호 변경",
        placeholder: "새 비밀번호를 입력해주세요",
        body: { password: inputValue.value.trim() },
      };

  // 현재 계정 정보 검증
  const checkUserInf = async () => {
    try {
      const req = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: inputValue.userId.trim(),
          password: inputValue.password.trim(),
        }),
      });
      if (!req.ok) {
        alert("회원정보가 일치하지 않습니다.");
        return;
      }
      setChecked(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 실제 변경
  const onClick = async () => {
    if (inputValue.value.trim().length < 3) return;
    if (error) return;

    try {
      const res = await fetch(`/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content.body),
      });
      if (!res.ok) {
        alert("변경에 실패했습니다.");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      await clearSession();
      navigate("/login", { replace: true });
    }
  };

  // 아이디 중복 체크 (아이디 변경일 때만)
  useEffect(() => {
    setError(false);
    if (!changeId || !inputValue.value.trim()) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const checkId = async () => {
      try {
        const req = await fetch(
          `/user?userId=${encodeURIComponent(inputValue.value.trim())}`,
          { signal },
        );
        if (!req.ok) return;
        const res = await req.json();
        const existing = Array.isArray(res)
          ? res.find((u) => Number(u.id) !== Number(id))
          : null;
        setError(!!existing);
      } catch (error) {
        console.error(error);
      }
    };
    checkId();

    return () => controller.abort();
  }, [inputValue.value, changeId, id]);

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
            placeholder={content.placeholder}
            error={error}
            className="mb-2"
            message={"이미 존재하는 아이디입니다."}
          >
            {changeId ? "새 아이디" : "새 비밀번호"}
          </Input>
          <Button onClick={onClick}>변경하기</Button>
        </>
      ) : (
        <>
          <p className="mb-2 text-sm text-brand-sub text-center">
            사용중인 아이디와 비밀번호를 입력해주세요
          </p>
          <Input
            value={inputValue.userId}
            onChange={(e) => onChange(e, "userId")}
            placeholder="현재 아이디"
            minLength={3}
          >
            현재 아이디
          </Input>
          <Input
            value={inputValue.password}
            onChange={(e) => onChange(e, "password")}
            placeholder="현재 비밀번호"
            minLength={3}
            className="mb-4"
            type="password"
          >
            현재 비밀번호
          </Input>
          <Button onClick={checkUserInf}>확인하기</Button>
        </>
      )}
    </div>
  );
};
