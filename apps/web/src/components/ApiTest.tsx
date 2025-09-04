import React, { useState } from "react";
import { getRequest, postRequest } from "../api/request";

interface ApiTestProps {}

const ApiTest: React.FC<ApiTestProps> = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, success: boolean, data: any) => {
    setTestResults((prev) => [
      ...prev,
      { test, success, data, timestamp: new Date().toISOString() },
    ]);
  };

  const testEndpoint = async (name: string, testFn: () => Promise<any>) => {
    setLoading(true);
    try {
      const result = await testFn();
      addResult(name, true, result);
    } catch (error: any) {
      addResult(name, false, {
        error: error.message,
        status: error.response?.status,
      });
    }
    setLoading(false);
  };

  const testProfileEndpoint = () => {
    testEndpoint("GET /api/profile", () => getRequest({ url: "/api/profile" }));
  };

  const testGamesEndpoint = () => {
    testEndpoint("GET /api/games", () => getRequest({ url: "/api/games" }));
  };

  const testCreateGame = () => {
    testEndpoint("POST /api/games", () =>
      postRequest({
        url: "/api/games",
        body: {
          player1: "Test Player 1",
          player2: "Test Player 2",
          score1: 21,
          score2: 18,
        },
      })
    );
  };

  const testPlayersEndpoint = () => {
    testEndpoint("GET /api/players", () => getRequest({ url: "/api/players" }));
  };

  const testDebugToken = () => {
    testEndpoint("GET /debug/token", () => getRequest({ url: "/debug/token" }));
  };

  const testSimpleAuth = () => {
    testEndpoint("GET /test/simple-auth", () =>
      getRequest({ url: "/test/simple-auth" })
    );
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Authentication Test</h2>

      <div className="mb-6 space-x-2">
        <button
          onClick={testDebugToken}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Debug Token
        </button>
        <button
          onClick={testSimpleAuth}
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Simple Auth Test
        </button>
        <button
          onClick={testProfileEndpoint}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Profile
        </button>
        <button
          onClick={testGamesEndpoint}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Get Games
        </button>
        <button
          onClick={testCreateGame}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Create Game
        </button>
        <button
          onClick={testPlayersEndpoint}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Test Players
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>

      {loading && <div className="text-blue-600 mb-4">Testing endpoint...</div>}

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded border ${
              result.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{result.test}</span>
              <span
                className={`text-sm ${
                  result.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {result.success ? "✅ Success" : "❌ Failed"}
              </span>
            </div>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(result.data, null, 2)}
            </pre>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {testResults.length === 0 && (
        <div className="text-gray-500 text-center py-8">
          Click the buttons above to test API endpoints with authentication
        </div>
      )}
    </div>
  );
};

export default ApiTest;
