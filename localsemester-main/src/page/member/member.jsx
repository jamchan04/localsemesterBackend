import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useMyProfile } from "../../store/myprofile";
import { useFetch } from "../../hooks/useFetch";
import { AnimatedContainer } from "components/animationContainer/animationContainer";
import { Modal } from "components/modal/modal";
import IntroSection from "./component/introSection";
import MemberSection from "./component/memberSection";
import MemberNameList from "./component/memberNameList";
import MemberModal from "./component/memberModal";

const slogans = [
  "함께 만드는 4조.",
  "우리의 기술과 경험으로 미래를 만듭니다.",
];

const Member = () => {
  const loadedMembers = useLoaderData();
  const [members, setMembers] = useState(loadedMembers);
  const sectionRefs = useRef([]);
  const { isModal, openModal, closeModal } = useModal();
  const {
    isModal: isCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { id: myId, state: myState, username: myName, profilePhoto } =
    useMyProfile((state) => state.myProfile);
  const { fetcher } = useFetch();
  const isAdmin = myState === 777;

  const handleCardClick = (member) => {
    setSelectedMember(member);
    openModal();
  };

  const handleEditSave = async (newMsg) => {
    const canEdit = isAdmin || selectedMember?.userId === myId;
    if (!canEdit) {
      alert("본인 카드만 수정할 수 있습니다.");
      return;
    }
    const result = await fetcher(
      {
        url: `/member/${selectedMember.id}`,
        method: "PATCH",
        body: { article: newMsg },
      },
      () => {
        setSelectedMember((prev) => ({ ...prev, article: newMsg }));
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.id === selectedMember.id ? { ...m, article: newMsg } : m
          )
        );
      }
    );
    if (!result) alert("수정에 실패했습니다.");
  };

  const handleDelete = async () => {
    const canEdit = isAdmin || selectedMember?.userId === myId;
    if (!canEdit) return;
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    const result = await fetcher(
      {
        url: `/member/${selectedMember.id}`,
        method: "DELETE",
      },
      () => {
        setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
        setSelectedMember(null);
        closeModal();
      }
    );
    // 204 등의 경우 result가 없을 수 있으므로 추가 알림 없이 상태만 유지
    if (!result) {
      setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
      setSelectedMember(null);
      closeModal();
    }
  };

  const handleCreate = async () => {
    
    if (!newMessage.trim()) return;

    const result = await fetcher(
      {
        url: "/member",
        method: "POST",
        body: { article: newMessage, userId: myId },
      },
      (data) => {
        setMembers((prev) => [
          ...prev,
          {
            id: data?.id ?? Date.now(),
            userId: myId,
            username: myName || "나",
            article: newMessage,
            photo: profilePhoto || "",
          },
        ]);
        setNewMessage("");
        closeCreateModal();
      }
    );

    if (!result) alert("생성에 실패했습니다.");
  };

  return (
    <main className="font-sans overflow-x-hidden">
      <IntroSection />

      <AnimatedContainer delay={0.5}>
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="flex flex-col space-y-2">
            {slogans.map((slogan, index) => (
              <p
                key={index}
                className="text-lg font-light leading-relaxed text-left speed-text"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {slogan}
              </p>
            ))}
          </div>
        </section>
      </AnimatedContainer>

      {isAdmin && (
        <section className="py-4 px-4 max-w-4xl mx-auto flex justify-end">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#37b4fe] text-white rounded hover:bg-[#2b9ed4]"
          >
            추가
          </button>
        </section>
      )}

      {members.map((member, index) => (
        <React.Fragment key={member.id}>
          <MemberSection
            member={member}
            index={index}
            sectionRef={(el) => (sectionRefs.current[index] = el)}
            onClick={() => handleCardClick(member)}
          />
        </React.Fragment>
      ))}

      <MemberNameList members={members} sectionRefs={sectionRefs} />

      {isModal && selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={closeModal}
          onSave={(newMsg) => handleEditSave(newMsg)}
          onDelete={handleDelete}
          isAdmin={isAdmin && selectedMember.userId === myId}
        />
      )}

      {isCreateModal && (
        <Modal
          closeModal={() => {
            setNewMessage("");
            closeCreateModal();
          }}
          className="max-w-md w-full p-6"
        >
          <h3 className="text-lg font-semibold mb-3 text-center">멤버</h3>
          <textarea
            className="w-full p-2 border rounded mb-3 bg-white text-brand placeholder-gray-400
                       dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-300"
            rows={4}
            placeholder="소개글을 입력하세요"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="w-full py-2 bg-[#37b4fe] text-white rounded hover:bg-[#2b9ed4]"
              disabled={!newMessage.trim()}
            >
              생성하기
            </button>
            <button
              onClick={() => {
                setNewMessage("");
                closeCreateModal();
              }}
              className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Member;
