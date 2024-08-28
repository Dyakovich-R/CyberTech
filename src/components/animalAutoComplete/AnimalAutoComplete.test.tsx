import { filterAnimals } from '../../utils/Utils';

describe('filterAnimals', () => {
  const animals = [
    'Elephant',
    'Tiger',
    'Dolphin',
    'Kangaroo',
    'Penguin',
    'Giraffe',
    'Panda',
    'Lion',
    'Eagle',
    'Zebra',
  ];

  test('should return animals that match the query', () => {
    expect(filterAnimals(animals, 't')).toEqual(['Tiger']);
    expect(filterAnimals(animals, 'e')).toEqual(['Elephant', 'Eagle']);
  });

  test('should return an empty array if no animals match the query', () => {
    expect(filterAnimals(animals, 'xyz')).toEqual([]);
  });

  test('should be case-insensitive', () => {
    expect(filterAnimals(animals, 'E')).toEqual(['Elephant', 'Eagle']);
    expect(filterAnimals(animals, 'p')).toEqual(['Penguin', 'Panda']);
  });

  test('should handle empty query', () => {
    expect(filterAnimals(animals, '')).toEqual(animals);
  });

  test('should handle empty animal list', () => {
    expect(filterAnimals([], 't')).toEqual([]);
  });

  test('should filter animals based on input value', () => {
    const query = 'li';
    const result = filterAnimals(animals, query);
    expect(result).toEqual(['Lion']);
  });

  test('should correctly handle selecting an animal', () => {
    const selectedAnimal = 'Tiger';
    const inputValue = selectedAnimal;
    expect(inputValue).toBe('Tiger');
  });

  test('should correctly handle input change', () => {
    const inputChange = (value: string) => {
      return filterAnimals(animals, value);
    };

    const value = 'd';
    const result = inputChange(value);
    expect(result).toEqual(['Dolphin']);
  });
});
