import Logo from "./Logo";

export default function Sidebar() {
  return (
    <div className="sidebar w-[225px] h-full bg-green-800 flex flex-col fixed left-0 top-0">
      <div className="top p-2 pb-4 border-b border-slate-400">
        <Logo />
      </div>
      <div className="body flex-1"></div>
      <div className="footer p-3 border-t border-slate-400 text-center text-white">
        <span>Yellow World</span>
      </div>
    </div>
  );
}
