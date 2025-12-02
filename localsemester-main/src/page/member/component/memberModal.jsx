import React, { useState, useEffect } from "react";
import nullPhoto from "../../../assets/originalimg.png";
import { Modal } from "../../../components/modal/modal"; 

const MemberModal = ({ member, isAdmin, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(member.article || "");

  useEffect(() => {
    setEditMessage(member.article || "");
  }, [member.article]);

  const handleSave = () => {
    if (!editMessage.trim()) return; 
    onSave(editMessage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(member.article || "");
    setIsEditing(false);
  };

  return (
    <Modal closeModal={onClose} className="max-w-md w-full p-6">
      <img
        src={member.photo || nullPhoto}
        alt={member.username}
        className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
        onError={(e) => (e.currentTarget.src = nullPhoto)}
      />

      <h2 className="text-xl font-bold text-center mb-2 text-brand dark:text-brand-dark">
        {member.username}
      </h2>

      {isEditing ? (
        <textarea
          className="w-full p-2 border rounded mb-3 bg-white text-brand dark:bg-gray-700 dark:text-brand-dark"
          value={editMessage}
          onChange={(e) => setEditMessage(e.target.value)}
          rows={4}
          placeholder="내용을 입력하세요"
        />
      ) : (
        <p className="text-center text-brand-sub dark:text-gray-300 whitespace-pre-wrap">
          {member.article}
        </p>
      )}

      {isAdmin && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full mt-4 py-2 bg-[#37b4fe] text-white rounded hover:bg-[#2b9ed4]"
        >
          수정하기
        </button>
      )}

      {isEditing && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="w-full py-2 bg-[#37b4fe] text-white rounded hover:bg-[#2b9ed4]"
            disabled={!editMessage.trim()}
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      )}
    </Modal>
  );
};

export default MemberModal;
