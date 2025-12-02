import { useState } from "react";

export default function useChange(values) {
  const [inputValue, setInputValue] = useState(values);

  const onChange = (e, name) => {
    const value = e.target.value;

    setInputValue((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return { inputValue, setInputValue, onChange };
}

// 요소 구조
// {
//     username: {
//          name: string,
//          error: boolean,
//          valied: boolean
//     }
// }
