import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Lottie from 'lottie-react';
import AlumniAnimation from '../assets/Animations/AlumniAnimation.json';
import ReCAPTCHA from 'react-google-recaptcha';
import {Link} from 'react-router-dom'
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const role = "academics";
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [RecaptchaMessage,setRecaptchaMessage] = useState(false);
  
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setIsRecaptchaVerified(true); // Set to true when reCAPTCHA is completed
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
        setError('Please complete the reCAPTCHA.');
        setIsRecaptchaVerified(false); // Reset reCAPTCHA verification state
        setRecaptchaMessage(true);
        return;
    }
    
    // Proceed with the form submission (e.g., send data to backend)
    console.log({ email, password, name, age, recaptchaToken });
    // Reset error state
    setError('');
    setRecaptchaMessage(false)
};

  // const handleSignUp = async (e) => {
  //     e.preventDefault();
  //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //     if (!emailRegex.test(email)) {
  //         setError('Invalid email address');
  //         return;
  //     }
  //     setError('');

  //     dispatch(setIsFetching());
  //     const config = {
  //         method: 'POST',
  //         url: API_URL+'/api/auth/register',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         data: {
  //             email: email,
  //             password: password,
  //             name: name,
  //             age: age,
  //             role: role,
  //         },
  //         withCredentials: true,
  //     };

  //     try {
  //         const response = await axios.request(config);
  //         console.log(response.data);
  //         if (response.status === 200) {
  //             console.log('Signup success');
  //             const { token, role } = response.data;
  //             console.log(role);
  //             // const { email, role } = user;
  //             dispatch(loginSuccess({ email, role, token }));

  //             navigate('/redirect');
  //         } else {
  //             dispatch(loginFailure());
  //             console.log('Signup failed');
  //         }
  //     } catch (error) {
  //         dispatch(loginFailure());
  //         console.error('Error during signup:', error.message);
  //         console.error('Full error:', error);
  //     }
  // };

  return (
    <div className="flex flex-row gap-2">
      <div className="flex min-h-full mt-20 flex-1 flex-col justify-center ml-4 py-12  hidden md:block">
        <Lottie animationData={AlumniAnimation} className="h-full w-full"/>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:mr-52 py-12 mt-20 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#4a2c2a]">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
              <label
                htmlFor="name"
                className="block text-sm flex font-medium text-gray-900"
                style={{ outline: "none" }}
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="flex text-sm font-medium text-gray-900 outline-none"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-sm flex font-medium text-gray-900"
                style={{ outline: "none" }}
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-semibold focus:ring-2  sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4a2c2a] hover:text-[#cd882a]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={24} />
                  ) : (
                    <FaEye size={24} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-sm flex font-medium text-gray-900"
                style={{ outline: "none" }}
              >
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-semibold focus:ring-2  sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4a2c2a] hover:text-[#cd882a] hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={24} />
                  ) : (
                    <FaEye size={24} />
                  )}
                </button>
              </div>
            </div>
            

            <div className="w-full flex justify-center">
            <ReCAPTCHA
                        sitekey="6Ld8OUcqAAAAAIPAq8cSVeA1QVzB826prjigIWMk"
                        onChange={handleRecaptchaChange}
                    />
            </div>

            <div>
            {RecaptchaMessage && (
                            <p className="text-red-500 text-sm mb-2">
                                Please complete the reCAPTCHA to enable the submit button.
                            </p>
                        )}
              <button type = "submit"  className="flex w-full justify-center rounded-md hover:bg-[#cd882a] bg-[#4a2c2a] hover:text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cb0100]">
                Sign up
              </button>

            </div>
            <div className='flex gap-2 text-sm mt-5 justify-center'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

