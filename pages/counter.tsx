import { useState } from 'react';

const NumberCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        onClick={decrement}
      >
        -
      </button>
      <span className="bg-gray-200 py-2 px-4">{count}</span>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default NumberCounter;