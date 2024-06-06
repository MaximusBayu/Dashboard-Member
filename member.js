export default function Newmember() {
  let A = 45;
  return (
    <div className="bg-white shadow-xl w-64 h-48 text-black rounded-xl flex flex-col items-center pt-4 mt-3">
      <h1 className="font-bold">Jumlah Member Humic</h1>
      <p className="pt-4 font-thin">
        <span className="text-7xl mr-2 font-normal">{A}</span>member
      </p>
    </div>
  );
}
