export function getDelayedResponse() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}
