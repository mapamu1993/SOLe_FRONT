import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { IMAGE_URL } from "../../../config/constants";

const UserProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;
  let profileImageUrl = user.profilePicture;
  if (profileImageUrl && !profileImageUrl.startsWith("http")) {
    profileImageUrl = `${IMAGE_URL}/uploads/users/${profileImageUrl}`;
  }

  const displayName = user.name || user.username || "Usuario";

  const initial =
    user.name && user.name.length > 0
      ? user.name[0]
      : user.username
      ? user.username[0]
      : "U";

  const formateRole =
    user.role && user.role.length > 0
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "Usuario";

  const profileDetails = [
    {
      label: "Usuario",
      value: user.username,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Role",
      value: formateRole,
    },
    {
      label: "Telefono",
      value: user.phone || "No proporcionado",
    },
    {
      label: "Direccion",
      value: user.address || "No proporcionado",
    },
  ];

  return (
    <div>
      <h1>Perfil de {displayName}</h1>
      <div>
        <img src={profileImageUrl} alt="Perfil" />
        <h2>{displayName}</h2>
        <p>{initial}</p>
      </div>
      <ul>
        {profileDetails.map((detail, index) => (
          <li key={index}>
            <strong>{detail.label}:</strong> {detail.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfilePage;
