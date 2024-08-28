import React, { useEffect, useRef, useState } from 'react';
import '../../styles/AnimalAutocomplete.scss';
import { filterAnimals } from '../../utils/Utils';

const animalsList = [
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

export const AnimalAutoComplete: React.FC = () => {
  const [animals, setAnimals] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredAnimals, setFilteredAnimals] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAnimals = () => {
      setLoading(true);

      setTimeout(() => {
        setAnimals(animalsList);
        setLoading(false);
      }, 3000);
    };

    fetchAnimals();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const filtered = filterAnimals(animals, value);
      setFilteredAnimals(filtered);
      setDropDown(true);
    } else {
      setFilteredAnimals([]);
      setDropDown(false);
    }
  };

  const handleSelectAnimal = (animal: string) => {
    setInputValue(animal);
    setDropDown(false);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setDropDown(false);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredAnimals.length > 0) {
      setInputValue(filteredAnimals[0]);
      setDropDown(false);
    }
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title">AnimalAutoComplete</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div
              className="dropdown is-active"
              ref={containerRef}
              onFocus={() => setDropDown(inputValue !== '')}
              tabIndex={-1}
              onBlur={onInputBlur}
            >
              <div className="dropdown-trigger">
                <input
                  value={inputValue}
                  onChange={onInputChange}
                  type="text"
                  placeholder="▼ Enter animals name"
                  className="input"
                />
              </div>

              {dropDown && (
                <div
                  onBlur={onInputBlur}
                  className="dropdown-menu"
                  role="menu"
                >
                  {filteredAnimals.length > 0 ? (
                    filteredAnimals.map(animal => (
                      <div
                        className="dropdown-content"
                        key={animal}
                      >
                        <div className="dropdown-item">
                          <p
                            className="has-text-link"
                            onClick={() => handleSelectAnimal(animal)}
                            onKeyDown={handleOnKeyDown}
                            tabIndex={0}
                          >
                            {animal}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="
                        notification
                        is-danger
                        is-light	
                        is-align-self-flex-start
                        "
                      role="alert"
                    >
                      <p className="has-text-danger">No matching found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
