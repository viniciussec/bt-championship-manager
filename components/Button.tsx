type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "mt-4 bg-[#6EA8F7] text-white px-4 py-2 rounded-md font-medium " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
