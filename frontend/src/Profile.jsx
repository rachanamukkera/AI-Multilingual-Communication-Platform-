import { useEffect, useState } from "react";
import api from "./api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await api.get("accounts/profile/");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Unable to load profile");
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Welcome, {profile.username} 👋</h2>

      <p>Email: {profile.email}</p>
      <p>Language: {profile.preferred_language}</p>
      <p>Country: {profile.country}</p>
      <p>Timezone: {profile.timezone}</p>
    </div>
  );
}

export default Profile;