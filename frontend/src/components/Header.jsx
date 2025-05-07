import logoSchool from '../assets/logo-school.svg';

function Header({ name }) {
  return (
    <header className="border border-gray-200 h-24 px-8 flex justify-between border-t-0 border-l-0 border-r-0 sticky top-0 bg-white z-10 align-middle items-center">
      <div className="text-2xl font-bold font-raleway text-indigo-700 tracking-widest">{name}</div>
      <div className="flex gap-2 align-middle items-center text-indigo-700">
        <img src={logoSchool} alt="Logo" className="w-8 h-8 border rounded-full" />

        <div className="font-raleway tracking-widest">Mist High School</div>
      </div>
    </header>
  );
}

export default Header;
