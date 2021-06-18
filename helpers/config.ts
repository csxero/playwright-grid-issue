export const getExecutionType = (): string => {
  const executionType = process.env?.E2E_EXECUTION_TYPE ?? "local"; // eslint-disable-line
  return executionType.trim();
};
