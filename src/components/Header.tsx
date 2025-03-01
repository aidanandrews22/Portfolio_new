import { useState, useEffect } from 'react';

export default function Header() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    
    useEffect(() => {
        // Check if user has a stored preference
        const storedTheme = localStorage.getItem('color-theme') as 'light' | 'dark' | 'system' | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }
        
        // Apply the theme
        applyTheme(storedTheme || 'system');
    }, []);
    
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        if (newTheme === 'system') {
            // Remove any forced classes and follow system preference
            document.documentElement.classList.remove('force-light', 'force-dark');
            localStorage.removeItem('color-theme');
        } else {
            // Apply specific theme
            document.documentElement.classList.remove('force-light', 'force-dark');
            document.documentElement.classList.add(`force-${newTheme}`);
            localStorage.setItem('color-theme', newTheme);
        }
    };
    
    const toggleTheme = () => {
        let newTheme: 'light' | 'dark' | 'system';
        
        // Cycle through themes: system -> light -> dark -> system
        if (theme === 'system') newTheme = 'light';
        else if (theme === 'light') newTheme = 'dark';
        else newTheme = 'system';
        
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="container mx-auto px-6 md:px-10">
                    {/* Profile Section - flex-col on mobile, flex-row on md+ */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
                        <div className="flex items-center gap-4 group">
                            {/* Image with decorative elements */}
                            <div className="relative">
                                <img 
                                    src="/assets/header.jpeg" 
                                    alt="Aidan Andrews" 
                                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] group-hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all duration-300"
                                />
                                {/* Decorative circle */}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="space-y-0.5">
                                <h1 className="text-lg md:text-xl font-bold">Aidan Andrews</h1>
                                <p className="text-sm opacity-80">Entrepreneur, Researcher, Engineer</p>
                                <p className="text-xs opacity-60 flex items-center gap-1.5">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"></span>
                                    AI & Physics
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"></span>
                                    CS
                                </p>
                            </div>
                        </div>

                        {/* Social Links - centered on mobile, right-aligned on desktop */}
                        <div className="flex items-center justify-center md:justify-end gap-4 pt-1">
                            {/* Theme toggle button */}
                            <button
                                onClick={toggleTheme}
                                className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors relative group cursor-pointer"
                                title={`Current theme: ${theme}. Click to toggle.`}
                                aria-label="Toggle color theme"
                            >
                                {theme === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : theme === 'dark' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
                            </button>
                            
                            <a 
                                href="mailto:aidansa2@illinois.edu" 
                                className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors relative group"
                                title="Email me"
                            >
                                <span className="sr-only">Email</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
                            </a>
                            
                            <a 
                                href="https://github.com/aidanandrews22" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors relative group"
                                title="GitHub"
                            >
                                <span className="sr-only">GitHub</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
                            </a>
                            
                            <a 
                                href="https://linkedin.com/in/aidanandrewss" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors relative group"
                                title="LinkedIn"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
                            </a>
                            
                            <a 
                                href="https://www.youtube.com/@aidanandrews/streams" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors relative group"
                                title="Watch me work on YouTube"
                            >
                                <span className="sr-only">YouTube</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
                            </a>
                            
                            <div className="hidden md:block ml-2 h-8 w-px bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"></div>
                            
                            <a 
                                href="https://www.aaxiom.org" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_25%,transparent)] transition-colors text-[var(--color-primary)] text-sm transition-colors"
                            >
                                <span>AAXIOM</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}