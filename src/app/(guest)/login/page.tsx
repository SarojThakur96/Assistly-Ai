import Avatar from "@/components/Avatar";
import { SignIn } from "@clerk/nextjs";

function LoginPage() {
  return (
    <div className="flex py-10 md:py-0 flex-col flex-1 justify-center items-center bg-[#64B5F5]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center space-y-5 text-white">
          <div className="">
            <Avatar seed="Support Agent" className="h-70 w-70" />
          </div>
          <div className="text-center">
            <h1 className="text-5xl">Promptly AI</h1>

            <h2 className="text-lg font-light">
              Your Customisable AI Chat Agent
            </h2>
            <h3 className="my-5 font-bold text-base">Sign in to get started</h3>
          </div>
        </div>

        <SignIn routing="hash" fallbackRedirectUrl="/" />
      </div>
    </div>
  );
}

export default LoginPage;
