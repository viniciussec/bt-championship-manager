import Link from "next/link";
import { ReactNode } from "react";
import MainNav from "../components/MainNav";

type Props = {
  children: ReactNode;
};

export default function Guest({ children }: Props) {
  return (
    <>
      <div className="flex flex-col items-stretch justify-between h-screen space-y-10">
        <div>
          <MainNav />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
