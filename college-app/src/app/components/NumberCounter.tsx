import { useEffect, useRef } from "react";

interface NumberCounterProps {
  target: number;
  label: string;
}

const NumberCounter: React.FC<NumberCounterProps> = ({ target, label }) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateCount = () => {
      if (!counterRef.current) return;

      const targetValue = target;
      const count = parseInt(counterRef.current.innerText, 10) || 0;
      const increment = targetValue / 100;

      if (count < targetValue) {
        counterRef.current.innerText = `${Math.ceil(count + increment)}`;
        setTimeout(updateCount, 30);
      } else {
        counterRef.current.innerText = `${targetValue}`;
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: 0.2,
    };

    const observerCallback: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && counterRef.current) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
    };
  }, [target]);

  return (
    <div className="number-counter text-5xl flex flex-col items-center gap-4 font-bold text-blue-500 my-4">
      <span ref={counterRef}>0</span>
      <p className="text-lg text-gray-600 mt-2">{label}</p>
    </div>
  );
};

export default NumberCounter;
