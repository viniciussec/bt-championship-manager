import { MouseEventHandler } from "react";

type ButtonProps = {
  label: string;
  onClick?: (e: any) => void;
  className?: string;
  color?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `mt-4  text-white px-4 py-2 rounded-md font-medium ${
          props.color ? props.color : "bg-[#6EA8F7] hover:bg-[#3d8bf8]"
        } ` + props.className
      }
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
