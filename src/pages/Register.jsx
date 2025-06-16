import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CloudCog } from "lucide-react";

const Register = () => {
  const { register, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

  try {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const userCredential = await register(trimmedEmail, trimmedPassword);
  await updateUserProfile({ displayName: name, photoURL: photo });
  toast.success("Registration successful!");
  navigate("/");
} catch (error) {
  toast.error("Registration failed: " + error.message);
   console.error(error); 

}

    
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-green-400">Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">
        {/* Dummy fields to prevent autofill */}
        <input type="text" name="fakeusernameremembered" className="hidden" />
        <input type="password" name="fakepasswordremembered" className="hidden" />

        <input
          type="text"
          placeholder="Full Name"
          name="new-name"
          autoComplete="off"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border text-black"
        />

        <input
          type="url"
          placeholder="Photo URL"
          name="new-photo"
          autoComplete="off"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full p-2 border text-black"
        />

        <input
          type="email"
          placeholder="Email"
          name="new-email"
          autoComplete="new-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border  text-black"
        />

        <input
          type="password"
          placeholder="Password"
          name="new-password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border text-black"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>

       <button
  onClick={handleGoogleLogin}
  className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded shadow-sm py-2 px-4 bg-white hover:bg-gray-100 transition text-gray-700"
>
  <img
    src="https://i.ibb.co/v4MVCrXD/Google-Icons-09-512.webp"
    alt="Google logo"
    className="w-5 h-5"
  />
  <span className="text-sm font-medium">Sign in with Google</span>
</button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;