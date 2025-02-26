"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Globe } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
const codeExample = `// Example code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

export default function Home() {

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Navbar/>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">Code Anywhere,</span>
              <span className="block text-blue-600">Execute Everywhere</span>
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              A powerful online code editor supporting Java, Python, and JavaScript. Write, run, and share your code instantly.
            </motion.p>
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl"
          >
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              className="!bg-dark-600 !p-6"
            >
              {codeExample}
            </SyntaxHighlighter>
          </motion.div>
        </div>
      </motion.section>

      <Link className="flex justify-center" href="/sandbox/editor">
        <button className="flex items-center mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Let&apos;s Code
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </Link>
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-dark-700 rounded-lg shadow-lg"
            >
              <Terminal className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Multiple Languages</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Support for Java, Python, and JavaScript with real-time syntax highlighting.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-dark-700 rounded-lg shadow-lg"
            >
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Instant Execution</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Run your code instantly and see results in real-time with our powerful execution engine.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-dark-700 rounded-lg shadow-lg"
            >
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cloud Storage</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Save your code snippets and access them from anywhere in the world.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};