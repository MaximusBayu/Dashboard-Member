export default function RegMember() {
  return (
    <div className="bg-white shadow-xl w-2/3 h- text-black rounded-xl flex flex-col mt-3 p-14">
      <h1 className="font-semibold mb-5">Register Akun Member</h1>
      <hr></hr>
      <form name="message" method="post" className="flex flex-col ">
        <div className="float-left">
          <label for="name" className="block mt-2 mb-1">
            Nama Lengkap
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nama Member"
            className="mb-2 text-sm"
          />
        </div>
        <div className="float-left">
          <label for="email" className="block mt-2 mb-1">
            Email Member
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="mb-2 text-sm"
            placeholder="Email Member"
          />
        </div>
        <div className="float-left">
          <label for="username" className="block  mt-2 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username Member"
            className="mb-2 text-sm"
          />
        </div>
        <div className="float-left">
          <label for="pw" className="block  mt-2 mb-1">
            Password
          </label>
          <input
            id="pw"
            type="text"
            name="pw"
            placeholder="Password Member"
            className="border-b mb-2 text-sm border-black "
          />
        </div>
        <div className="float-left">
          <label for="upw" className="block  mt-2 mb-1">
            Ulangi Password
          </label>
          <input
            id="upw"
            type="text"
            name="upw"
            placeholder="Ulangi Password"
            className="border-b border-black mb-2 text-sm"
          />
        </div>
        <input
          type="submit"
          className="w-1/4 rounded-md mt-3 bg-blue-600 hover:bg-sky-700 py-3 text-white cursor-pointer"
          value="Register"
        />
      </form>
    </div>
  );
}
