import React, { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Show loading skeleton
    setResult(null); // Reset result before making the call

    try {
      // Simulating backend call with a delay
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(`Result: ${inputValue}`), 2000)
      );

      setResult(response); // Set the result once the backend call completes
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data");
    } finally {
      setIsLoading(false); // Hide skeleton once done
    }
  };

  return (
    <div className="flex flex-col w-full h-screen px-4 pb-4">
      <div className="output-field flex-col space-y-2 mb-4">
        {isLoading ? (
          // Show skeletons while loading
          <>
            <Skeleton className="w-[500px] h-[20px] rounded-full" />
            <Skeleton className="w-[500px] h-[20px] rounded-full" />
          </>
        ) : (
          // Show result if available
          result && <div className="w-[500px] h-[20px] rounded-full text-gray-800">{result}</div>
        )}
      </div>
      <div className="flex w-full gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text"
        />
        <Button
          onClick={handleSubmit}
          className="px-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          variant="destructive"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;




