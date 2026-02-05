import React, { useState } from "react";
import Nav from "../components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// Import syntax highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const questions = [
  {
    title: "Generate Pascal's Triangle",
    question: `Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]

Constraints:
1 <= numRows <= 30
class Solution {
public:
    vector<vector<int>> generate(int numRows) {

    }
};`,
    solution: `class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        int m = numRows;
        vector<vector<int>> v;
        for (int i = 1; i <= m; i++) {
            vector<int> a(i);
            v.push_back(a);
        }
        for (int i = 0; i < m; i++) {
            int first = 1;
            for (int j = 0; j <= i; j++) {
                v[i][j] = first;
                first = first * (i - j) / (j + 1);
            }
        }
        return v;
    }
};`,

    explanation: `# Intuition
We know that Pascal's Triangle is built such that each element is the sum of the two elements directly above it. The first and last elements of every row are always 1.

# Approach
1. Create a 2D vector 'v' to store all rows.
2. For each row i (from 0 to numRows - 1), initialize a vector of size i + 1.
3. Set the first element to 1, then use the formula:
   \`v[i][j] = v[i-1][j-1] + v[i-1][j]\`
   for all valid j.
4. Return the final 2D vector containing all rows.

# Complexity
- Time complexity: O(numRows²)
  - We calculate each value in the triangle once.
- Space complexity: O(numRows²)
  - We store all elements of the triangle.`
  },
];

const DailyChallenge = () => {
  const [showSolutionIndex, setShowSolutionIndex] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-600">
      <Nav />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800 mt-17">
          Daily Coding Challenges
        </h1>

        {questions.map((q, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg rounded-2xl p-6 mb-8 hover:scale-[1.02] transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold mb-3">{q.title}</h2>

            {/* Render question with syntax highlighting */}
            <div className="mb-4 text-sm">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="bg-white text-black px-1 rounded"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {q.question}
              </ReactMarkdown>
            </div>

            <AnimatePresence>
              {showSolutionIndex === index && (
                <motion.pre
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white text-gray-900 p-4 rounded-lg mb-4 overflow-x-auto text-sm shadow-inner whitespace-pre-wrap"
                >
                  {q.solution}
                </motion.pre>
              )}
            </AnimatePresence>

            <button
              onClick={() =>
                setShowSolutionIndex(showSolutionIndex === index ? null : index)
              }
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all 
              ${
                showSolutionIndex === index
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-black/80 hover:bg-black"
              }`}
            >
              {showSolutionIndex === index ? "Hide Solution" : "Show Solution"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenge;
