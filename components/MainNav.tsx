import Link from "next/link";
import Image from "next/image";

export default function MainNav() {
  return (
    <div className="flex justify-between p-3 bg-white drop-shadow-xl">
      <Link href="/" >
        <Image className="cursor-pointer" alt="Logo" height="40" width="40" src="/logo_bt.png" />
      </Link>
      <div className="flex justify-between space-x-4">
        <Link href="/auth/register">
          <button className="font-medium">Registre-se</button>
        </Link>
        <Link href="/auth/login">
          <button className="text-white bg-[#6EA8F7] rounded-md px-2 py-1 font-medium">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
