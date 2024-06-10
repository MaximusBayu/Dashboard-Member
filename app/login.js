export default function Loginpage() {
  return (
    <main>
      <div className="flex justify-center self-center">
        <div className="bg-gray-100 bg h-full flex bg-Header bg-no-repeat bg-HeaderTop bg-bottomTop">
          <div className="w-3/5 p-5 flex justify-center items-center">
            <div className="flex flex-col justify-center p-32 items-center">
              <img src="org.png" className="w-7/12"></img>
              <p className="text-xl text-center w-9/12">
                Selamat Datang di Dashboard Data Member{" "}
                <span className="font-extrabold">HUMIC Engineering</span>
              </p>
              <img src="humic.png" className="w-20 mt-4"></img>
            </div>
          </div>{" "}
          {/* Sign in section */}
          <div className="w-2/5 bg-white text-black m-4 rounded-2xl py-52 px-32">
            <h1 className="font-semibold text-2xl mb-3 text-center">LOGIN</h1>
            <p className="text-xl text-left font-light mb-1">
              Login as an admin user
            </p>
            <form method="POST">
              <input
                type="text"
                id="Username"
                name="username"
                placeholder="Username"
                className="w-full rounded-md mt-3 py-3 px-3 border-gray-400 border text-black "
              />
              <input
                type="text"
                id="Password"
                name="Password"
                placeholder="Password"
                className="w-full rounded-md mt-3 border-gray-400 py-3 px-3 border text-black "
              />
              <input
                type="submit"
                className="w-full rounded-md mt-3 bg-blue-600 hover:bg-sky-700 py-3 text-white cursor-pointer"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
