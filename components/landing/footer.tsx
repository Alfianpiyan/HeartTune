export function Footer() {
  return (
    <footer className="w-full pt-10 pb-8 bg-[#FAFBFC] border-t border-[#EBF0F7]">
      <div className="max-w-6xl mx-auto px-8 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-lg bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #0A1F3D 0%, #4A7FBD 100%)", fontFamily: "'Homemade Apple', cursive" }}
            >
              Heartune
            </span>
            <p className="text-[11px] text-[#0A1F3D]/35 max-w-[200px] leading-relaxed">
              where melody meets emotion — send what words can't say.
            </p>
          </div>

      
          <div className="flex items-start gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[#0A1F3D]/30 tracking-widest uppercase mb-1">Product</span>
              {["Write", "Explore", "Moments"].map((item) => (
                <span key={item} className="text-[11px] text-[#0A1F3D]/45 hover:text-[#0A1F3D] transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[#0A1F3D]/30 tracking-widest uppercase mb-1">Company</span>
              {["About", "Support", "Privacy"].map((item) => (
                <span key={item} className="text-[11px] text-[#0A1F3D]/45 hover:text-[#0A1F3D] transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-[#EBF0F7] via-[#B8C9E0]/30 to-transparent" />

      
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-[#0A1F3D]/25 font-medium">
            © {new Date().getFullYear()} Heartune. All rights reserved.
          </p>
          <p className="text-[11px] text-[#0A1F3D]/20 italic">
            made with song &amp; feelings
          </p>
        </div>

      </div>
    </footer>
  );
}