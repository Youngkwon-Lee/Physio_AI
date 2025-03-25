/**
 * Utility for capturing and sending error logs to our debug endpoint
 */

// Override console methods to capture and send logs
export const setupErrorLogger = () => {
  if (typeof window === 'undefined') return;

  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;

  // Send log to our API endpoint
  const sendLog = async (type: string, args: any[]) => {
    try {
      const serializedArgs = args.map(arg => {
        if (arg instanceof Error) {
          return {
            message: arg.message,
            stack: arg.stack,
            name: arg.name
          };
        }
        return arg;
      });

      await fetch('/api/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          log: {
            type,
            timestamp: new Date().toISOString(),
            args: serializedArgs
          }
        }),
      });
    } catch (e) {
      // Use original console method as fallback
      originalConsoleError('Failed to log error:', e);
    }
  };

  // Override console.error
  console.error = function(...args) {
    // Call the original method first
    originalConsoleError.apply(console, args);
    // Then send to our API
    sendLog('error', args);
  };

  // Override console.log
  console.log = function(...args) {
    // Call the original method first
    originalConsoleLog.apply(console, args);
    // Then send to our API
    sendLog('log', args);
  };

  // Override console.warn
  console.warn = function(...args) {
    // Call the original method first
    originalConsoleWarn.apply(console, args);
    // Then send to our API
    sendLog('warn', args);
  };

  // Capture unhandled errors and promise rejections
  window.addEventListener('error', (event) => {
    sendLog('unhandled-error', [event.error || event.message]);
  });

  window.addEventListener('unhandledrejection', (event) => {
    sendLog('unhandled-rejection', [event.reason]);
  });
};

// Clear all logs
export const clearLogs = async () => {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clear: true }),
    });
  } catch (e) {
    console.error('Failed to clear logs:', e);
  }
};

// Get all logs
export const getLogs = async () => {
  if (typeof window === 'undefined') return [];

  try {
    const response = await fetch('/api/debug');
    const data = await response.json();
    return data.logs;
  } catch (e) {
    console.error('Failed to get logs:', e);
    return [];
  }
};
