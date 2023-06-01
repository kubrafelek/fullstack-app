import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import CreateTodo from "y/component/CreateTodo";
import Todos from "y/component/Todos";
import { api } from "y/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "greetings" });

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">TODO</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-2">
            <div
              className="flex max-w flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-xl font-bold">Todos</h3>
              <div className="text-lg">
                <Todos />
              </div>
              <div className="text-lg">
                <CreateTodo />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {/* {hello.data && hello.data.greeting} */}
              {/* {sessionData ? sessionData.user.email : "Sign in"} */}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = sessionData.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined },
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user.email}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
