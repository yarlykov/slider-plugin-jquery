
type ConsoleMethod = 'log' | 'info' | 'warn' | 'error';

function _log(
  message: string,
  args: any,
  prefix: string,
  type: ConsoleMethod = 'log',
): void {
  prefix = prefix ? prefix + ': ' : '';
  message = prefix + message;

  console[type](message, args);
}

// Пример вызова
_log('Test logging message', 123, 'Logger', 'info');