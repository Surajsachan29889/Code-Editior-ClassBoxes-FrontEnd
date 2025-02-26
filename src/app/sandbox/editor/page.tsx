"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Play, Send, Loader2 } from "lucide-react";
import { useCodeExecuteMutation } from "@/slices/rtk-query/apis";

const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), { 
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
  )
});

export default function Page() {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<"javascript" | "java" | "python">("javascript");
  const [isExecuting, setIsExecuting] = useState(false);

  const [executeCode, { isLoading }] = useCodeExecuteMutation();
    
  const executeCodeFn = async () => {
    setIsExecuting(true);
    try {
        const response = await executeCode({ code, language, type: "execution" });
        if (response.data) {
            setOutput(response.data.output);
            console.log(response.data);
        }
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
    setIsExecuting(false);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Code submitted:", code);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Interactive Code Editor</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Editor Section */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-card rounded-lg shadow-lg overflow-hidden flex-grow">
                <div className="bg-muted p-3 border-b flex items-center justify-between !bg-dark-600">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as "javascript" | "java" | "python")}
                    className="bg-transparent text-sm font-medium text-muted-foreground outline-none"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                  <button
                    onClick={executeCodeFn}
                    disabled={isExecuting || isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isExecuting || isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isExecuting || isLoading ? "Running..." : "Run Code"}
                  </button>
                </div>
                <div className="h-full min-h-[500px]">
                  <MonacoEditor
                    language={language}
                    defaultValue={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      theme: "vs-dark"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Output and Submission Section */}
            <div className="flex flex-col gap-4 !bg-dark-600">
              {/* Output Panel */}
              <div className="bg-card rounded-lg shadow-lg border flex-grow">
                <div className="bg-muted p-3 border-b">
                  <h2 className="font-medium text-foreground">Output</h2>
                </div>
                <div className="p-4 font-mono text-sm overflow-auto max-h-[300px]">
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <p className="text-muted-foreground">Run your code to see the output here</p>
                  )}
                </div>
              </div>

              {/* Submission Section */}
              <div className="bg-card rounded-lg shadow-lg border">
                <div className="bg-muted p-3 border-b">
                  <h2 className="font-medium text-foreground">Submit Solution</h2>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Make sure your code passes all test cases before submitting.
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isLoading ? "Submitting..." : "Submit Solution"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}