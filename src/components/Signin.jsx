import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { users } from '../data/user';

export const SignIn = () => {
    const [isSignin, setSignin] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [valid_error, setError] = useState(null);
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const role = useRef(null);


    const toggletosignup = () => { 
        email.current.value = "";
        password.current.value = "";
        if (name.current) name.current.value = "";
        setError(null)
        setSignin(isSignin => !isSignin);
    };


   const handlebuttonclick = (e) => {
    const userEmail = email.current.value.trim();
    const userPassword = password.current.value.trim();
    const userRole = role.current.value;
    const fullName = name.current?.value?.trim();

    if (!userEmail || !userPassword || !userRole || (!isSignin && !fullName)) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignin) {
      const foundUser = users.find(
        (u) =>
          u.email === userEmail &&
          u.password === userPassword &&
          u.role === userRole
      );

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        setError(null);
        navigate(
          userRole === "Doctor" ? "/doctor-dashboard" : "/patient-dashboard"
        );
      } else {
        setError("Invalid email, password, or role.");
      }
    } else {
      const exists = users.find((u) => u.email === userEmail);
      if (exists) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        name: fullName,
        email: userEmail,
        password: userPassword,
        role: userRole,
      };
      users.push(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setError(null);
      navigate(userRole === "Doctor" ? "/doctor-dashboard" : "/patient-dashboard");
    }
  };
    

    return (
        <div className="relative min-h-screen text-white">

            <div className="absolute inset-0 -z-10">
                <img
                    className="w-full h-full object-cover"
                    src="https://cdn.pixabay.com/photo/2017/10/21/12/15/tooth-2874551_1280.jpg"
                    alt="background"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>


            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-11/12 sm:w-3/12 absolute p-10 sm:p-12 bg-black bg-opacity-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
            >
                <h1 className="font-bold text-3xl mb-6 text-white">
                    {isSignin ? 'Sign In' : 'Sign Up'}
                </h1>

                <input
                    ref={email}
                    type="text"
                    placeholder="Email or mobile number"
                    className="p-3 my-2 w-full bg-black bg-opacity-40 text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                {!isSignin && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-3 my-2 w-full bg-black bg-opacity-40 text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                )}

                <div className="relative">
                    <input
                        ref={password}
                        type={view ? "text" : "password"}
                        placeholder="Password"
                        className="p-3 my-2 w-full bg-black bg-opacity-40 text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <div
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-400"
                        onMouseDown={() => setView(!view)}
                        onMouseUp={() => setView(!view)}
                    >
                        {view ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </div>
                </div>

                <select
                    ref={role}
                    className="p-3 my-2 w-full bg-black bg-opacity-40 text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">Select Role</option>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                </select>
                {valid_error && <p className="text-red-500 font-bold">* {valid_error}</p>}

                <button
                    type="submit"
                    className="p-3 my-4 w-full bg-blue-600 hover:bg-blue-700 font-semibold rounded transition"
                    onClick={handlebuttonclick}
                >
                    {isSignin ? 'Sign In' : 'Sign Up'}
                </button>

                <p
                    className="text-sm mt-4 accent-white cursor-pointer hover:underline"
                    onClick={toggletosignup}
                >
                    {isSignin ? 'New to DentalCare ? Sign up now.' : 'Already have an account? Sign in.'}
                </p>
            </form>
        </div>
    );
};


