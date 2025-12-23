import { useEffect, useRef, useState } from 'react';

interface MarqueeTextProps {
  texts: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function MarqueeText({ 
  texts, 
  speed = 30, 
  direction = 'left',
  className = ''
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicates, setDuplicates] = useState(4);

  useEffect(() => {
    const updateDuplicates = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const needed = Math.ceil(containerWidth / 500) + 2;
        setDuplicates(Math.max(4, needed));
      }
    };

    updateDuplicates();
    window.addEventListener('resize', updateDuplicates);
    return () => window.removeEventListener('resize', updateDuplicates);
  }, []);

  const animationDuration = `${texts.length * 5 + speed}s`;

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div 
        className="inline-flex"
        style={{
          animation: `marquee-${direction} ${animationDuration} linear infinite`,
        }}
      >
        {Array.from({ length: duplicates }).map((_, dupIndex) => (
          <div key={dupIndex} className="inline-flex items-center">
            {texts.map((text, i) => (
              <span 
                key={`${dupIndex}-${i}`} 
                className="inline-flex items-center mx-8"
              >
                <span className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-wider opacity-20 hover:opacity-60 transition-opacity duration-500 cursor-default">
                  {text}
                </span>
                <span className="mx-8 text-primary text-3xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${100 / duplicates}%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-${100 / duplicates}%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
