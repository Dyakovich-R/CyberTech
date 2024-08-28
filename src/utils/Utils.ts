export const filterAnimals = (animals: string[], query: string) => {
  return animals.filter(animal =>
    animal.toLowerCase().startsWith(query.toLowerCase()),
  );
};
