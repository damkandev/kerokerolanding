'use client';

export default function CustomSlider({ value, min, max, onChange, label }) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-1 h-[5px] bg-gray-200 flex items-center">
        {/* Filled Track */}
        <div 
          className="absolute left-0 h-full bg-[#51B85F]" 
          style={{ width: `${percentage}%` }}
        ></div>
        {/* Native Range Input (Hidden) */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value} 
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-10"
        />
        {/* Custom Thumb */}
        <div 
          className="absolute w-[22px] h-[22px] bg-[#51B85F] outline-4 outline-offset-[-4px] outline-[#FFFFFF] pointer-events-none top-1/2 -translate-y-1/2 rounded-none"
          style={{ left: `calc(${percentage}% - 11px)` }}
        ></div>
      </div>
      {label && <p className="font-jetbrains text-[13px] text-gray-500 w-48 shrink-0">{label}</p>}
    </div>
  );
}
