import BasicTextFields from "./input";
import Newmember from "./member";


export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
   <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <div className="bg-gray-100 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl ">
      <div className="w-3/5 p-5 flex justify-center items-center">
        <div className="flex flex-col justify-center p-28 items-center">
          <img src="org.png" className="max-w-56"></img>
          <p>Selamat Datang di Dashboard Data Member <span className="font-extrabold">HUMIC Engineering</span></p>
          <img src="humic.png" className="w-20 mt-4"></img>
        </div>
      </div> {/* Sign in section */}
      <div className="w-2/5 bg-white text-black m-1 rounded-2xl py-40 px-12">
        <h1 className="font-bold text-xl mb-2">LOGIN</h1>
        <p className="text-xs text-left mx-2 mb-1">Login as an admin user</p>
        <BasicTextFields/>
        <button type="submit" className="w-56 rounded-md mt-3 bg-blue-600 py-2 text-white ">Login</button>
        </div>
    </div>
    <Newmember/>
   </main>
  </div>
  );
}
