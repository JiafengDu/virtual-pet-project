import "./PetDisplay.css";

import React, { useEffect, useState } from "react";
import { fetchRandomPetParts } from "./services";
import Loading from "./Loading";

const PETS_DATA = {
  L1: ["(\\__/)", "(\\(\\ ", "(\\__(\\"],
  L2: [
    "(='.' )",
    "( -.-)",
    "(o^.^)",
    "( o o)",
    "( T_T)",
    "(=°~°=)",
    "( -_-)",
    "( >_<)",
  ],
  L3: ['(")_(")', 'o_(")(")', 'z(_(")(")', '(>")(")', '!(_(")(")'],
};

export function RandomPet() {
  const [petParts, setPetParts] = useState(null);

  useEffect(() => {
    fetchRandomPetParts()
      .then((data) => {
        setPetParts(data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }, []);

  if (!petParts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pet__representation">
      <p className="l1__representation">{PETS_DATA.L1[petParts.L1]} </p>
      <p className="l2__representation">{PETS_DATA.L2[petParts.L2]}</p>
      <p className="l3__representation">{PETS_DATA.L3[petParts.L3]}</p>
    </div>
  );
}

export function ShowPet({ petParts }) {
  return (
    <div className="pet__representation">
      <p className="l1__representation">{PETS_DATA.L1[petParts.L1]} </p>
      <p className="l2__representation">{PETS_DATA.L2[petParts.L2]}</p>
      <p className="l3__representation">{PETS_DATA.L3[petParts.L3]}</p>
    </div>
  );
}

export function ShowPets({
  pets,
  isPending,
  lastAddedPetId,
  onDeletePet,
  onTogglePet,
}) {
  const [petHappiness, setPetHappiness] = useState({});

  const updatePetHappiness = () => {
    const updatedHappiness = { ...petHappiness };
    for (const pet of Object.values(pets)) {
      let happiness = updatedHappiness[pet.id] || 60; 
      happiness -= 3; 
      updatedHappiness[pet.id] = happiness;
    }
    setPetHappiness(updatedHappiness);
  };

  const handlePetInteraction = (petId) => {
    const updatedHappiness = petHappiness[petId] + 15;
    setPetHappiness({ ...petHappiness, [petId]: updatedHappiness });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updatePetHappiness();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [pets, petHappiness]);

  return (
    <div className="pet__list">
      {isPending && (
        <Loading className="pets__waiting">Loading Pets...</Loading>
      )}
      {!Object.keys(pets).length ? (
        <p>No Pet Items yet, add one!</p>
      ) : (
        <div className="pets">
          <h2>Your Pets:</h2>
          {Object.keys(pets).map((id) => (
            <div key={id} className="pet">
              <h4>{pets[id].name}</h4>
              <ShowPet petParts={pets[id].parts} />
                {petHappiness[id]<60 && <p className="pet__sad">I am sad :/</p>}
                {60<=petHappiness[id]&&petHappiness[id]<=80 && <p className="pet__okay">I am okay :|</p>}
                {petHappiness[id]>80 && <p className="pet__happy">I am happy :D</p>}
              <div className="pet__control">
                <button className="delete__pet__button" onClick={() => onDeletePet(id)}>Delete</button>
                <button className="pet__pet__button" onClick={() => handlePetInteraction(id)}>Pet</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
