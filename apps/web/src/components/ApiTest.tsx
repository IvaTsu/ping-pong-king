import React, { useState } from "react";

import { getRequest, postRequest } from "../api/request";

interface TestResult {
  test: string;
  success: boolean;
  data: unknown;
  timestamp: string;
}

const ApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, success: boolean, data: unknown): void => {
    setTestResults((prev) => [
      ...prev,
      { test, success, data, timestamp: new Date().toISOString() },
    ]);
  };

  const testEndpoint = async (
    name: string,
    testFn: () => Promise<unknown>
  ): Promise<void> => {
    setLoading(true);
    try {
      const result = await testFn();
      addResult(name, true, result);
    } catch (error) {
      addResult(name, false, {
        error: (error as Error).message,
        status: (error as { response?: { status?: number } }).response?.status,
      });
    }
    setLoading(false);
  };

  const testProfileEndpoint = (): void => {
    testEndpoint(
      "GET /api/profile",
      async () => await getRequest({ url: "/api/profile" })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const testGamesEndpoint = (): void => {
    testEndpoint(
      "GET /api/games",
      async () => await getRequest({ url: "/api/games" })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const testCreateGame = (): void => {
    testEndpoint(
      "POST /api/games",
      async () =>
        await postRequest({
          url: "/api/games",
          body: {
            player1: "Test Player 1",
            player2: "Test Player 2",
            score1: 21,
            score2: 18,
          },
        })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const testPlayersEndpoint = (): void => {
    testEndpoint(
      "GET /api/players",
      async () => await getRequest({ url: "/api/players" })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const testDebugToken = (): void => {
    testEndpoint(
      "GET /debug/token",
      async () => await getRequest({ url: "/debug/token" })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const testSimpleAuth = (): void => {
    testEndpoint(
      "GET /test/simple-auth",
      async () => await getRequest({ url: "/test/simple-auth" })
    ).catch(() => {
      // Ignore errors here, they are expected if not authenticated
    });
  };

  const clearResults = (): void => {
    setTestResults([]);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-4 text-2xl font-bold">API Authentication Test</h2>

      <div className="mb-6 space-x-2">
        <button
          onClick={testDebugToken}
          disabled={loading}
          className="bg-gray-500 hover:bg-gray-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Debug Token
        </button>
        <button
          onClick={testSimpleAuth}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Simple Auth Test
        </button>
        <button
          onClick={testProfileEndpoint}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Test Profile
        </button>
        <button
          onClick={testGamesEndpoint}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Test Get Games
        </button>
        <button
          onClick={testCreateGame}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Test Create Game
        </button>
        <button
          onClick={testPlayersEndpoint}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 rounded px-4 py-2 text-white disabled:opacity-50"
        >
          Test Players
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 rounded px-4 py-2 text-white"
        >
          Clear Results
        </button>
      </div>

      {loading && <div className="text-blue-600 mb-4">Testing endpoint...</div>}

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div
            key={index}
            className={`rounded border p-4 ${
              result.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">{result.test}</span>
              <span
                className={`text-sm ${
                  result.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {result.success ? "✅ Success" : "❌ Failed"}
              </span>
            </div>
            <pre className="bg-gray-100 max-h-40 overflow-auto rounded p-2 text-xs">
              {JSON.stringify(result.data, null, 2)}
            </pre>
            <div className="text-gray-500 mt-1 text-xs">
              {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {testResults.length === 0 && (
        <div className="text-gray-500 py-8 text-center">
          Click the buttons above to test API endpoints with authentication
        </div>
      )}
    </div>
  );
};

export default ApiTest;
