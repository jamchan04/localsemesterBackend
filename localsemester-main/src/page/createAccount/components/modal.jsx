import { Button } from "../../../components/button/button";

export const CreateAccountModal = ({ value, onClick }) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-8 justify-center flex-col">
        <img
          className="w-12 mb-4"
          src="	https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/service/2633a5c6018a00001.png"
          alt="하트"
        />
        <h1 className="text-3xl font-bold">회원가입 완료 !</h1>
      </div>

      <div className="flex items-center flex-col text-base text-brand-sub my-4">
        <p>{value.username}님의 회원가입을 축하합니다.</p>
        <p> 로그인을 진행해주세요.</p>
      </div>

      <Button onClick={onClick} className="">
        로그인하기
      </Button>
    </div>
  );
};
