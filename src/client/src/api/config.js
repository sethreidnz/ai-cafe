
export const configApiEndpoint = `${process.env.REACT_APP_API_HOST}api/config`;

export const getCognitiveServicesConfig = async () => {
  const response = await fetch(configApiEndpoint);
  return await response.json();
}