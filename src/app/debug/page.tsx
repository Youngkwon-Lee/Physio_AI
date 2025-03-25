'use client';

import { useEffect, useState } from 'react';
import { getLogs, clearLogs } from '@/lib/error-logger';

export default function DebugPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const logs = await getLogs();
      setLogs(logs);
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearLogs = async () => {
    try {
      await clearLogs();
      setLogs([]);
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  const formatLogArgs = (args: any[]) => {
    return args.map((arg, index) => (
      <pre key={index} className="overflow-auto max-w-full text-xs whitespace-pre-wrap">
        {typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)}
      </pre>
    ));
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error':
      case 'unhandled-error':
      case 'unhandled-rejection':
        return 'bg-red-950 border-red-700';
      case 'warn':
        return 'bg-yellow-950 border-yellow-700';
      default:
        return 'bg-zinc-900 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Logs</h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={loadLogs}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded"
          >
            Refresh Logs
          </button>
          <button
            onClick={handleClearLogs}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded"
          >
            Clear Logs
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No logs found</div>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`p-4 border rounded ${getLogColor(log.type)}`}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm">{log.type.toUpperCase()}</span>
                  <span className="text-gray-400 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="mt-2">{formatLogArgs(log.args)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
