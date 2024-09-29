import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";
import MatchupRow from "./MatchupRow";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });

export default function Form() {
    return (
        <>
            <div className="flex flex-row items-center justify-center ">
                <h1 className={`${statfont.className} text-3xl align-center -mb-11 bgorangegrad rounded-xl`}>REGISTER OR LOGIN</h1>
            </div>
            <div className="w-full flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-3 md:p-4 2xl:p-5 3xl:p-6 bggrayd-nohov rounded-2xl shadow-xl items-center">
                {/* Header Section */}

                <div className="text-sm font-light text-gray-200">
                    Login to your account.
                </div>

                {/* Login Form */}
                <form className="flex flex-col bggrayd-nohov-inv  rounded-lg">
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">Email</label>
                        <div className="relative text-gray-700">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="pl-12 mb-2 bg-gray-50 text-gray-700 border border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full py-3 px-4"
                                placeholder="name@company.com"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">Password</label>
                        <div className="relative text-gray-700">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M12 8v8"></path>
                                    <path d="M8.5 14l7-4"></path>
                                    <path d="M8.5 10l7 4"></path>
                                </svg>
                            </span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full py-3 px-4"
                                placeholder="••••••••••"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bgorangegrad  font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    >
                        Login
                    </button>
                    <div className="text-sm font-light text-gray-500">
                        Don't have an account yet? <a href="#" className="font-medium text-orange-600 hover:underline">Sign Up</a>
                    </div>
                </form>



                {/* Social Login */}
                <form className="bg-transparent">
                    <div className="flex flex-row gap-2 justify-center">
                        <button className="flex flex-row w-32 gap-2 p-2 rounded-md text-gray-200 bgbluegrad">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                            <span className="font-medium mx-auto">Github</span>
                        </button>
                        <button className="flex flex-row w-32 gap-2  p-2 rounded-md text-gray-200 bgbluegrad">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                            <span className="font-medium mx-auto">Twitter</span>
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}