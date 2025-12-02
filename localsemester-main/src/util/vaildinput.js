export const validateInput = (type, value) => {
  const regexMap = {
    userId: /^[a-zA-Z0-9]{4,12}$/, // 영문+숫자 4~12자
    password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,20}$/, // 문자+숫자+특문 4~20자
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 기본형
    phone: /^01[016789]-?\d{3,4}-?\d{4}$/, // 핸드폰 번호
    name: /^[가-힣a-zA-Z]{2,20}$/, // 이름: 한글/영문 2~20자
    code: /^[0-9]{6}$/, // 인증코드: 숫자 6자리
  };

  const regex = regexMap[type];
  if (!regex) {
    console.warn(`🚨 지원하지 않는 타입: ${type}`);
    return false;
  }

  return regex.test(value);
};
