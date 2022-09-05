export interface Error {
  code: number | string;
  data: { message: string; code: number };
  message: string;
  reason?: string;
}

export const getErrorMessage = (error: Error, summary: string) => {
  const title = `Unable to ${summary[0].toLowerCase()}${summary.slice(1)}`;
  const errorCode = error?.code;
  const errorMessage = error?.data?.message as string;
  let message = '';
  if (error.message.includes('User denied')) {
    message = `User denied transaction confirmation`;
    return { title, message };
  }
  switch (errorCode) {
    case -32603:
    case -32700:
    case -32600:
    case -32601:
    case -32602:
    case -32000:
    case -32001:
    case -32002:
    case -32003:
    case -32004:
      message = errorMessage?.replace(`VM Exception while processing transaction: revert`, ``);
      break;
    case 'CALL_EXCEPTION':
      message = error.reason;
      break;
    default:
      message = title;
  }
  return { title, message };
};
