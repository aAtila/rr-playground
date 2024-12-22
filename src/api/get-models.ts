export const getModels = async (brand: string): Promise<string[]> => {
  const response = await fetch(`/data/models.json`);
  const data = await response.json();
  console.log(`data:`, data);
  return data[brand];
};
