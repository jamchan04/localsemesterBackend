import { useEffect, useState } from "react";
import { Container } from "../../components/container/container";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import defaultImg from "../../assets/originalimg.png";
import { Button } from "../../components/button/button";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/modal/modal";
import { useMyProfile } from "../../store/myprofile";
import { ChangeLoginInfModal } from "./modal/changeLoginInfModal";

export const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loader = useLoaderData();
  const { editMyProfile, myProfile } = useMyProfile();
  const { isModal, openModal, closeModal } = useModal();

  const [inputValue, setInputValue] = useState(myProfile.message);

  const [isChangeId, setIsChangeId] = useState(true);

  const changeMessage = async () => {
    if (myProfile.message === inputValue) {
      return;
    }

    const req = await fetch(`/user/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputValue }),
    });
    const res = await req.json();
    if (res) {
      editMyProfile("message", inputValue);
      navigate(`/profile/${id}`);
    }
  };

  const onClickModal = (arg) => {
    setIsChangeId(arg);
    openModal();
  };

  useEffect(() => {
    if (!loader) {
      alert("인증 실패");
      navigate("/login");
    }
  }, [navigate, loader]);

  return (
    <Container>
      {isModal && (
        <Modal closeModal={closeModal}>
          <ChangeLoginInfModal id={myProfile.id} changeId={isChangeId} />
        </Modal>
      )}
      <div className=" mx-auto py-10 text-white w-full md:max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-brand dark:text-brand-dark">
          프로필 편집
        </h1>

        <p className="ml-1 text-brand-sub text-base font-bold mb-1">회원정보</p>
        <div className="flex items-center mb-6 w-full px-3 py-2 text-sm rounded-lg text-brand-sub bg-brand-point dark:bg-card-dark">
          <img
            src={myProfile.profilePhoto || defaultImg}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="text-sm text-gray-400">
            <p className="text-base text-brand font-semibold dark:text-brand-dark">
              {myProfile.username}
            </p>
            <p>{myProfile.state === 777 ? "관리자" : "일반회원"} </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block ml-1 text-brand-sub text-base font-bold mb-1">
            소개
          </label>
          <textarea
            placeholder="메세지를 작성해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={30}
            className="w-full px-3 py-2 text-brand dark:text-brand-sub bg-brand-point dark:bg-card-dark rounded-lg"
          />
          <p className="text-xs text-gray-400 text-right">/30</p>
        </div>

        <div className="flex flex-col gap-2 w-full text-brand-sub ">
          <p className="ml-1 mb-1 font-bold">로그인정보 변경</p>
          <div className="w-full px-3 py-2 text-sm rounded-lg text-brand-sub bg-brand-point dark:bg-card-dark">
            <div className="flex items-center justify-between">
              <p>아이디 변경</p>
              <Button onClick={() => onClickModal(true)} className="w-32">
                변경
              </Button>
            </div>
          </div>
          <div className="w-full px-3 py-2 text-sm rounded-lg text-brand-sub bg-brand-point dark:bg-card-dark">
            <div className="flex items-center justify-between">
              <p>비밀번호 변경</p>
              <Button onClick={() => onClickModal(false)} className="w-32">
                변경
              </Button>
            </div>
          </div>
        </div>

        <div className=" my-8 dark:text-brand-sub text-gray-500">
          <label className="block text-sm font-medium mb-1 ">
            프로필에 계정 표시
          </label>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>프로필에 계정 표시</span>
          </div>
          <p className="text-xs mt-1">
            사람들이 회원님의 프로필에 게시글을 미리 볼 수 있는지, 회원님의
            계정이 다른 프로필에서 게시글을 볼 수 있는지를 선택하세요.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={changeMessage} className="w-48">
            제출하기
          </Button>
        </div>
      </div>
    </Container>
  );
};
