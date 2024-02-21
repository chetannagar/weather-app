/** @format */

export function convertKelvinToCelsius(tempinKelvin: number): number {
  const tempInCelsius = tempinKelvin - 273.15;
  return Math.floor(tempInCelsius);
}
