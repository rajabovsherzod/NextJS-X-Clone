"use client";
import { useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import useRegisterModal from "@/hooks/useRegisterModal";
import RegisterModal from "../modals/register-modal";


const Auth = () => {
    const registerModal = useRegisterModal();
    const onOpenRegisterModal = useCallback(() => {
        registerModal.onOpen();
    }, [registerModal]);

    return (
        <>
        <RegisterModal />
        <main className="flex min-h-screen bg-black text-white items-center justify-center p-4 relative">
            <div className="lg:hidden absolute top-4 left-4">
                <Image src="/images/x.svg" alt="X Logo" width={30} height={30} />
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl">

                {/* Left side: Big Logo (for desktop) */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                    <Image src="/images/x.svg" alt="X Logo" width={300} height={300} className="w-full max-w-xs" />
                </div>
                
                {/* Right side: Auth Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4">
                    <div className="w-full max-w-sm">
                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 mt-16 lg:mt-0">Happening now</h1>
                        <h2 className="text-xl lg:text-3xl font-bold mb-8">Join today.</h2>

                        <div className="space-y-3">
                            <Button className="w-full rounded-full flex items-center justify-center bg-white text-black hover:bg-gray-200 font-semibold">
                                <Image src="/images/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
                                Sign up with Google
                            </Button>
                            <Button className="w-full rounded-full flex items-center justify-center bg-white text-black hover:bg-gray-200 font-semibold">
                                <FaGithub className="mr-2" />
                                Sign up with Github
                            </Button>
                        </div>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-neutral-700"></div>
                            <span className="mx-4 text-sm font-semibold">or</span>
                            <div className="flex-grow border-t border-neutral-700"></div>
                        </div>

                        <div className="space-y-4">
                             <Button className="w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 text-md" onClick={onOpenRegisterModal}>
                                Create account
                             </Button>
                             <p className="text-xs text-neutral-500">
                                By signing up, you agree to the <a href="#" className="text-sky-500 hover:underline">Terms of Service</a> and <a href="#" className="text-sky-500 hover:underline">Privacy Policy</a>, including <a href="#" className="text-sky-500 hover:underline">Cookie Use</a>.
                             </p>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-bold text-lg mb-4">Already have an account?</h3>
                            <Button
                                className="w-full rounded-full bg-transparent border border-sky-500 text-sky-500 font-bold hover:bg-sky-500/10 py-3 text-md transition-colors"
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
};

export default Auth;