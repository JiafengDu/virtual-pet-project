const uuid = require('uuid').v4;

function makePetManager() {
  const id1 = uuid();

  const petManager = {};
  const pets = {
    [id1]: {
      id: id1,
      name: 'Nap',
      parts: {
        L1: 0,
        L2: 0,
        L3: 0,
      },
    },
  };

  petManager.contains = function contains(id) {
    return !!pets[id];
  };

  petManager.getPets = function getPets() {
    return pets;
  };

  petManager.addPet = function addPet(pet) {
    const id = uuid();
    const {name, parts} = pet;
    name.trim().replace(/[^\w\s]/gi, '');
    pets[id] = {
      id,
      name,
      parts,
    };
    return id;
  };

  petManager.getPet = function getPet(id) {
    return pets[id];
  };

  petManager.updatePetName = function updatePetName(id, pet) {
    pets[id].name = pet.name ?? pets[id].name;
  };

  petManager.deletePet = function deletePet(id) {
    delete pets[id];
  };

  return petManager;
};

module.exports = {
  makePetManager,
};
