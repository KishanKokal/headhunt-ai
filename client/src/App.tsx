import React, { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NavigationMenuDemo } from "@/components/ui/NavigationMenuDemo";

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
    <div className="flex flex-col">
    <NavigationMenuDemo />
    <div className="flex flex-col items-center w-full h-screen p-6 space-y-6">
      
      <div className="output-field flex flex-col space-y-2 w-full max-w-md">
        {isLoading ? (
          // Show skeletons while loading
          <>
            <Skeleton className="w-full h-10 rounded-md" />
            <Skeleton className="w-full h-10 rounded-md" />
          </>
        ) : (
          // Show result if available
          result && <div className="w-full h-10 rounded-md text-gray-800">{result}</div>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md md:flex-row md:gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text"
        />
        <Button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          variant="destructive"
        >
          Submit
        </Button>
      </div>
    </div>
    
    </div>
  );
}

export default App;








