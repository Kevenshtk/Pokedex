import { Toaster, toast } from 'sonner'

const menuItems = [
  { icon: "fa-house", label: "Home" },
  { icon: "fa-circle-dot", label: "Pokedex", active: true },
  { icon: "fa-gamepad", label: "Videogames" },
  { icon: "fa-id-card", label: "GCC Pokemon" },
  { icon: "fa-tv", label: "TV Pokemon" },
  { icon: "fa-trophy", label: "Play! Pokemon" },
  { icon: "fa-newspaper", label: "News" },
];

const Navbar = () => {
  return (
    <nav className="bg-white rounded-2xl shadow-sm mb-6 px-4 py-2 flex items-center justify-between">
      <Toaster position="top-right"/>
      <div className="flex space-x-2 md:space-x-8 overflow-x-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 px-3 py-4 border-b-2 transition-colors whitespace-nowrap ${item.active ? "border-red-500 text-red-500" : "border-transparent text-gray-400 hover:text-gray-600"}`}
            onClick={() => toast.info('Funcionalidade indisponível!')}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
