import React from 'react';

type QuoteProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

const Quote = ({
  title = 'EXPERIENCE the beauty of the Philippines',
  subtitle,
  className = '',
}: QuoteProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}>
      <h1 className="font-Rubik w-full text-center text-4xl text-white sm:text-5xl md:text-6xl lg:text-6xl">
        {title}
      </h1>
      {subtitle && <p className="mt-4 text-white/90 text-lg">{subtitle}</p>}
    </div>
  );
};

export default Quote;
