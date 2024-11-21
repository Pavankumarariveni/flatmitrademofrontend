import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tailwindStyles from '../utils/tailwindStyles';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // Temporary in-memory user database
  const [users, setUsers] = useState([{email: 'demo1@gmail.com',password: 'Demo123@'}]);

  const validate = () => {
    const formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!isLogin && !formData.name) formErrors.name = 'Name is required';
    if (!formData.email || !emailRegex.test(formData.email)) formErrors.email = 'Invalid email';
    if (!formData.password || !passwordRegex.test(formData.password)) {
      formErrors.password = 'Password must be 8+ chars, with uppercase, lowercase, and symbol';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      setLoading(false);

      if (isLogin) {
        const existingUser = users.find(
          (user) => user.email === formData.email && user.password === formData.password
        );
        if (existingUser) {
          onClose()
          navigate('/user');
        } else {
          setErrors({ email: 'Invalid email or password' });
        }
      } else {
        const userExists = users.some((user) => user.email === formData.email);

        if (userExists) {
          setMessage("User already exists, please log in.");
          setIsLogin(true);
        } else {
          const newUser = { name: formData.name, email: formData.email, password: formData.password };
          setUsers([...users, newUser]);
          setMessage("Account created successfully! Logging in...");
          navigate('/user');
        }
      }
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 p-8 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {message && <p className="text-center text-sm text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label className="text-sm text-gray-600">Show Password</label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 font-semibold rounded-md transition duration-200 ${tailwindStyles.secondaryButton}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-700 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
        {isLogin && (
          <div>
            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button className="w-full py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition duration-200 flex items-center justify-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google Icon"
                style={{ height: '24px', width: '24px', marginRight: '12px' }}
              />
              Login with Google
            </button>
            <button className="w-full py-2 mt-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2">
              Login with Facebook
            </button>
          </div>
        )}

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
