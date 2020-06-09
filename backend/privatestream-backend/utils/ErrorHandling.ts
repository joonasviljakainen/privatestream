const createErrorMessage = (status: number, message: string) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(
      {
        message: message,
      },
      null,
      2
    ),
  };
};

export { createErrorMessage };
