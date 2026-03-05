import { RefObject } from "react";

interface CameraViewProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    isScanning: boolean;
    showFrames: boolean;
}

export function CameraView({ videoRef, isScanning, showFrames }: CameraViewProps) {
    return (
        <div className="relative w-full max-w-sm">
            {/* AI Vision Active Badge */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-[#0f2e24]/80 backdrop-blur-md border border-[#00ff88] rounded-full px-4 py-1.5 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_#00ff88]" />
                <span className="text-[10px] font-black tracking-widest text-[#00ff88] uppercase">AI VISION ACTIVE</span>
            </div>

            {/* Camera View */}
            <div className="relative aspect-[3/4] bg-[#1a4d3d] rounded-[2.5rem] overflow-hidden border-4 border-[#1a4d3d] shadow-2xl">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#0f2e24]/40 to-transparent pointer-events-none" />

                {isScanning && (
                    <div className="absolute inset-0 bg-[#00ff88]/10 animate-pulse flex items-center justify-center">
                        <div className="w-full h-[2px] bg-[#00ff88] shadow-[0_0_15px_#00ff88] absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                )}

                {showFrames && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full h-full">
                            <div className="absolute left-[10%] top-[15%] w-32 h-32 border-2 border-[#00ff88] rounded-2xl animate-in zoom-in duration-500 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                                <div className="absolute -top-3 -left-1 bg-[#00ff88] text-[#0f2e24] text-[10px] font-bold px-2 py-0.5 rounded-sm">98% MATCH</div>
                                <div className="absolute -bottom-10 left-0 right-0 bg-[#00ff88] text-[#0f2e24] text-xs px-3 py-1.5 rounded-xl text-center font-bold shadow-lg">3x Tomatoes</div>
                            </div>
                            <div className="absolute right-[10%] top-[40%] w-28 h-28 border-2 border-red-500 rounded-2xl animate-in zoom-in duration-500 delay-200 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                                <div className="absolute -top-3 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">LOW FRESHNESS</div>
                                <div className="absolute -bottom-10 left-0 right-0 bg-red-500 text-white text-xs px-3 py-1.5 rounded-xl text-center font-bold shadow-lg">! 2x Spinach</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute top-8 left-8 w-10 h-10 border-l-4 border-t-4 border-[#00ff88] rounded-tl-xl opacity-80" />
                <div className="absolute top-8 right-8 w-10 h-10 border-r-4 border-t-4 border-[#00ff88] rounded-tr-xl opacity-80" />
                <div className="absolute bottom-8 left-8 w-10 h-10 border-l-4 border-b-4 border-[#00ff88] rounded-bl-xl opacity-80" />
                <div className="absolute bottom-8 right-8 w-10 h-10 border-r-4 border-b-4 border-[#00ff88] rounded-br-xl opacity-80" />
            </div>
        </div>
    );
}
