import Image from "next/image";
import Link from "next/link";
import PlyrVideo from "./PlyrVideo";

export const metadata = {
    title: "Kinkedin - La mejor extensión para LinkedIn",
    description: "Calcula el ER real de tus posts, visualiza tu calendario de publicaciones y descubre los mejores horarios para publicar con nuestro heatmap.",
};

export default function KinkedinPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-full px-6 py-2">
                    <span className="text-lg font-medium">kinked<span className="text-green-400">in</span></span>
                </div>
                <a
                    href="#descargar"
                    className="border border-green-400 text-green-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-green-400 hover:text-black transition-all"
                >
                    descargar
                </a>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-16 md:py-24 max-w-5xl mx-auto">
                <div className="relative">
                    <Image
                        src="/kinkedin.png"
                        alt="Kinkedin mascot"
                        width={280}
                        height={280}
                        className="drop-shadow-2xl"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        kinked<span className="text-green-400">in</span>, la mejor
                        <br />
                        extensión para linked<span className="text-[#0077B5]">in</span>.
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="#descargar"
                            className="border border-[#444] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#222] transition-all"
                        >
                            descargar extensión
                        </a>
                        <button className="bg-green-500 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-green-400 transition-all">
                            me gusta
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 - Calcula el ER */}
                    <div className="flex flex-col">
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-4 mb-6 aspect-video flex items-center justify-center overflow-hidden">
                            <div className="bg-white rounded-lg p-3 text-black text-xs w-full max-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <div className="font-bold text-sm">damián · <span className="text-gray-500 font-normal">1d</span></div>
                                        <div className="text-[10px] text-gray-500">cofundador @ ceo @ rodar | cofundador @indies.cl</div>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-2">
                                    <span className="bg-gray-200 text-[10px] px-2 py-0.5 rounded-full">1.01% com</span>
                                    <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">Sano</span>
                                    <span className="text-blue-500">ℹ️</span>
                                </div>
                                <p className="text-[10px] leading-tight mb-2">Mi tía Valeska es clase media en Chile.<br />De esa que abre igual aunque no alcance.</p>
                                <p className="text-gray-500 text-[9px] italic">Tiene una tienda de plantas.</p>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">calcula el ER</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Mide el engagement real de tus posts, no la falsa viralidad.
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                            Calculamos tu ER usando impresiones, interacciones y el tiempo transcurrido desde la publicación.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Datos reales para tomar mejores decisiones.
                        </p>
                    </div>

                    {/* Feature 2 - Calendario de posts */}
                    <div className="flex flex-col">
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-4 mb-6 aspect-video flex items-center justify-center overflow-hidden">
                            <div className="bg-[#1e3a5f] rounded-lg p-3 text-white text-xs w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px]">📅</span>
                                    <span className="text-sm font-medium">Posts Programados</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[8px] mb-1">
                                    <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {[6, 7, 8, 9, 10, 11, 12].map((day, i) => (
                                        <div key={i} className={`text-[10px] p-1 rounded ${i === 1 || i === 3 ? 'bg-green-500/30 text-green-400' : ''}`}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 text-[9px] text-gray-400">
                                    <span className="text-green-400">●</span> 1 post programado
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">calendario de posts</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            LinkedIn no te lo pone fácil para ver qué tienes programado.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Acá tienes un calendario claro y ordenado con todos tus posts futuros, sin tener que adivinar ni hacer clics de más.
                        </p>
                    </div>

                    {/* Feature 3 - El heatmap */}
                    <div className="flex flex-col">
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-4 mb-6 aspect-video flex items-center justify-center overflow-hidden">
                            <div className="bg-[#1e3a5f] rounded-lg p-3 text-white text-xs w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px]">📅</span>
                                    <span className="text-sm font-medium">Posts Programados</span>
                                </div>
                                <div className="grid grid-cols-12 gap-0.5 text-center text-[6px] mb-1">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                                        <span key={hour}>{hour}</span>
                                    ))}
                                </div>
                                <div className="space-y-0.5">
                                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, dayIdx) => (
                                        <div key={day} className="grid grid-cols-12 gap-0.5">
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hourIdx) => {
                                                const patterns = [
                                                    [0, 0, 1, 2, 3, 3, 2, 1, 2, 3, 2, 1],
                                                    [0, 1, 2, 3, 3, 2, 1, 2, 3, 3, 2, 0],
                                                    [1, 2, 3, 3, 2, 1, 1, 2, 2, 3, 1, 0],
                                                    [0, 1, 2, 3, 3, 2, 2, 3, 3, 2, 1, 0],
                                                    [1, 2, 3, 2, 2, 1, 1, 2, 3, 2, 1, 0],
                                                    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
                                                    [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
                                                ];
                                                const intensity = patterns[dayIdx][hourIdx];
                                                const colors = ['bg-blue-900/30', 'bg-blue-600', 'bg-cyan-600', 'bg-cyan-400'];
                                                return (
                                                    <div key={hourIdx} className={`h-2 rounded-sm ${colors[intensity]}`}></div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">el heatmap</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Descubre qué días y a qué horas publicar para maximizar alcance e interacción.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Un heatmap basado en datos reales de Metricool, para publicar cuando de verdad importa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video & Download Section */}
            <section id="descargar" className="px-6 py-16 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    mira cómo instalarlo
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    en este video te explico como instalar la extensión de Kinkedin.
                </p>

                {/* Plyr Video Player */}
                <div className="mb-12 rounded-2xl overflow-hidden border border-[#333]">
                    <PlyrVideo videoId="hW2uw0kdb6M" />
                </div>

                {/* Download Button */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">
                        descarga la extensión
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Versión 0.1.1 • Compatible con Chrome y navegadores basados en Chromium
                    </p>
                    <a
                        href="/kinkedin_0_1_1.zip"
                        download="kinkedin_0_1_1.zip"
                        className="inline-flex items-center gap-2 bg-green-500 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-green-400 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        descargar kinkedin v0.1.1
                    </a>
                    <p className="text-gray-500 text-sm mt-4">
                        Archivo ZIP • Instalación manual en modo desarrollador
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-[#222] max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2026 Kinkedin by KeroKero</p>
                    <Link href="/tos_kinkedin" className="hover:text-white transition-colors">
                        Términos de Servicio
                    </Link>
                </div>
            </footer>
        </main>
    );
}
