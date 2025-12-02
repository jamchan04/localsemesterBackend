export const OptionModal = ({ list, closeModal, children }) => {
  return (
    <div className="flex flex-col w-72 justify-center items-center">
      <p className="text-base w-full text-center font-bold pb-2 ">{children}</p>
      <div
        onClick={closeModal}
        className="flex flex-col w-full text-center justify-center items-center text-brand-sub font-medium text-sm"
      >
        {list.map((item, index) => (
          <Option action={item.action} name={item.name} key={index} />
        ))}
        <p
          className="hover:text-red-600 w-full border-t dark:border-[#262d38] pt-3"
          onClick={closeModal}
        >
          취소
        </p>
      </div>
    </div>
  );
};

const Option = ({ action, name }) => {
  return (
    <p
      className="hover:text-brand w-full dark:hover:text-brand-dark py-3 border-t dark:border-[#262d38]"
      onClick={action}
    >
      {name}
    </p>
  );
};

// list = [{
//     name: "",
//     action: ()=>{},
//   }]
