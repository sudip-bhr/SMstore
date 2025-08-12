const Logo = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* SM Electronics Logo */}
      <div className="relative">
        {/* Circular background with white outline */}
        <div className="w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center">
          {/* SM Letters */}
          <div className="text-center">
            <div className="text-sm font-bold leading-none">
              <span className="text-green-300">S</span>
              <span className="text-white">M</span>
            </div>
            {/* ELECTRONICS text */}
            <div className="text-xs text-white font-medium tracking-wider">
              ELECTRONICS
            </div>
          </div>
        </div>
      </div>
      
      {/* Text logo */}
      {showText && (
        <span className="text-xl font-bold text-gray-900">SM Electronics</span>
      )}
    </div>
  );
};

export default Logo;