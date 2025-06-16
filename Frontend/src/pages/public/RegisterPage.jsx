import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Merged imports
import Card from "../../components/ui/Card";
import RegisterForm from "../../components/auth/RegisterForm";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await register({
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("Registration successful! Welcome.");
      navigate("/");
    } catch (error) {
      // Error is already toasted by useApi/service call
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your BetWise Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                id="firstName"
                name="firstName"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                id="lastName"
                name="lastName"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            Register
          </Button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      <div className="max-w-lg mx-auto mt-8">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your BetWise Account
          </h2>
          <RegisterForm />
          <SocialLoginButtons />
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
