export const checkAnimalExists = async (animal, animalsList, setAnimalToConfirm) => {
  let existentAnimalId;
  await animalsList.forEach(animalInList => {
    if (existentAnimalId)
      return;

    const dogSpeciesType = [ 'cao', 'canina' ];

    const animalSpecies = animal.species.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const animalName = animal.name.toLowerCase();
    const animalRace = animal.race.toLowerCase();

    if (
      animalInList.name.toLowerCase() === animalName
      && animalInList.race.toLowerCase() === animalRace
      && (
        (animalInList.species.toLowerCase() === 'gato' && animalSpecies === 'gato') ||
        (
          dogSpeciesType.includes(animalInList?.species.toLowerCase()) && 
          dogSpeciesType.includes(animalSpecies)
        )
      )
    )
      return existentAnimalId = animalInList.id;
  })

  if (existentAnimalId !== undefined) {
    setAnimalToConfirm(existentAnimalId);
    return true;
  }

  return false;
}