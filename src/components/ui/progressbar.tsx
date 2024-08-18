import React, { useEffect, useState } from "react";
import { Progress } from "./progress";

const Progressbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Progress value={progress} className="bg-green-900" max={100} />;
};

export default Progressbar;
