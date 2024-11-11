interface InputProbs {
  type?: string;
  value?: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCustom: React.FC<InputProbs> = ({
  type,
  name,
  placeholder,
  isRequired,
  value,
  onChange,
}) => {
  return (
    <input
      className="h-[38px] md:h-[40px] rounded-md indent-2 text-slate-800 text-lg outline-none "
      type={type ? type : "text"}
      value={value ? value : ""}
      placeholder={placeholder ? placeholder : ``}
      name={name ? name : ""}
      required={isRequired || false}
      onChange={onChange}
    />
  );
};

export default InputCustom;
