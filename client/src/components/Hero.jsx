import { useTheme } from '@/contexts/ThemeContext';

function Hero(){
    const { isDark } = useTheme();
    return(
        <>
            <section className ={`relative w-full h-[75vh] flex flex-col items-center justify-center overflow-hidden ${
                isDark
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-[var(--primary-bg)] text-[var(--primary-text)]'
                }`}>
                <div className="z-10 text-center space-y-6xl px-4">
                    <h1 className="dark:text-white md:text-6xl font-bold leading-tight">
                        Where Pencil Meets Creativity<br/>
                        <span className="text-indigo-400 md:text-3xl">
                            Every Stroke Tells a Story
                        </span>
                    </h1>
                </div>
                <div className="space-x-4">
                    {/* Buttons */}
                    <button
                        className={`font-semibold font-sans px-8 py-4 sm:p-2 xl:p-2 rounded-md transition-all duration-300 hover:scale-105 transform ${
                            isDark 
                                ? 'var(--primary-bg) text-gray-100'
                                : 'bg-gray-900 text-gray-100'
                            }`}
                        
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--accent-bg)';
                            e.target.style.color = 'var(--accent-text)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'var(--primary-bg)';
                            e.target.style.color = 'var(--primary-text)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >View Gallery</button>
                    <button
                        className="font-semibold px-8 py-4 sm:p-2 rounded-md transition-all duration-300 hover:scale-105 transform"
                    style={{
                        backgroundColor: 'var(--primary-bg)',
                        color: 'var(--primary-text)',
                        border: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--accent-bg)';
                        e.target.style.color = 'var(--accent-text)';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--primary-bg)';
                        e.target.style.color = 'var(--primary-text)';
                        e.target.style.transform = 'scale(1)';
                    }}
                    >Commission</button>
                </div>
            </section>
        </>
    ); 
}
export default Hero;