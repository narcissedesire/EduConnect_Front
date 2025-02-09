export default function UserCard({ user }) {
  return (
    <div
      className={`cursor-pointer flex items-center font-medium gap-2 mt-2 hover:bg-gray-100 p-1.5 transition-all duration-300 ease-in-out transform ${
        user.hasConversation ? "bg-blue-100" : ""
      }`}
    >
      <div className="relative">
        <img
          src={user.id_photo || "/images/default-avatar.png"}
          className="w-9 h-9 rounded-full object-cover"
          alt={`${user.nom} ${user.prenom}`}
        />
        {user.isOnline && (
          <div className="absolute h-2.5 w-2.5 rounded-full bg-lime-500 top-[3px] right-[3px]" />
        )}
      </div>
      <div className="flex items-center">
        <div className="flex flex-col">
          <span>{`${user.nom} ${user.prenom}`}</span>
          <span className="text-sm text-gray-500">
            {user.hasConversation ? "(Conversation existante)" : "(Nouvelle)"}
          </span>
        </div>
      </div>
    </div>
  );
}
