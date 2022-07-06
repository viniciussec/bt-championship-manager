import Guest from "../layouts/Guest";
import UserChampionships from "../components/UserChampionship";
import UserMatches from "../components/UserMatches";
import { useUserStore } from "../store/user";

export default function UserProfile() {
  const { user } = useUserStore();

  return (
    <Guest>
      <div
        style={{
          backgroundImage: 'URL("https://blog.boladetenisdelivery.com/wp-content/uploads/2021/12/beach-tennis-scaled.jpg")',
        }}
        className="bg-[#F7BC6D] min-h-screen flex flex-row items-center justify-center	"
      >
        <div className="grid w-3/4 grid-cols-4 gap-4 p-4 mt-4 bg-white rounded-md">
          <div className="flex flex-col items-center mt-4">
            <p className="mb-4 text-3xl font-semibold">Meu Perfil</p>
            <div className="flex items-center justify-center w-40 h-40 text-4xl font-bold text-white bg-[#6EA8F7] rounded-full">
              {user.name.charAt(0)}
            </div>
            <p className="mt-4 text-2xl font-bold">{user.name}</p>
            <p className="mt-4 text-xl font-bold">Vitórias: 312</p>
          </div>
          <div className="col-span-3 mt-4">
            <UserMatches />
            <UserChampionships />
          </div>
        </div>
      </div>
    </Guest>
  );
}
