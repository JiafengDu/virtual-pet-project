import "./Discover.css";

import React, { useState, useEffect } from "react";
import { fetchRandomPetParts } from "./services";
import { ACTIONS } from "./constants";
import { ShowPet } from "./PetDisplay";

function Discover({ username, onEvents }) {
  const [pets, setPets] = useState([]);
  const [chosenPetName, setChosenPetName] = useState("");
  const [chosenPetIndex, setChosenPetIndex] = useState(null);

  useEffect(() => {
    fetchRandomPetParts(6)
      .then((randomPets) => {
        setPets(randomPets);
      });
  }, []);

  function handleChoosePet(index) {
    setChosenPetIndex(index);
  }

  function handleNameChange(event) {
    setChosenPetName(event.target.value);
  }

  function handleConfirmName() {
    if (!chosenPetName) return;
    const newPet = {
      name: chosenPetName,
      parts: pets[chosenPetIndex],
    };
    onEvents.onAddPet(newPet);
    setChosenPetName("");
    setChosenPetIndex(null);
  }

  return (
    <div className="discover">
      <h2>Discover New Pets</h2>
      <div className="pet__list">
        {pets.map((pet, index) => (
          <div key={index} className="pet-card">
            <h3>{pet.name}</h3>
            <ShowPet petParts={pet}/>
            {chosenPetIndex === index ? (
              <div>
                <input
                  type="text"
                  value={chosenPetName}
                  onChange={handleNameChange}
                  placeholder="Enter pet name"
                />
                <button onClick={handleConfirmName}>Confirm</button>
              </div>
            ) : (
              <button onClick={() => handleChoosePet(index)}>Choose</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
