export const checkAnimalExists = async (animal, animalsList, setAnimalToConfirm) => {
  const animalSpecies = String(animal?.species).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const animalName = String(animal?.name).toLowerCase();
  const animalRace = String(animal?.race).toLowerCase();

  let existentAnimalId;
  await animalsList.forEach(animalInList => {
    if (existentAnimalId)
      return;

    const dogSpeciesType = [ 'cao', 'canina' ];

    if (
      String(animalInList?.name).toLowerCase() === animalName
      && String(animalInList?.race).toLowerCase() === animalRace
      && (
        (String(animalInList?.species).toLowerCase() === 'gato' && animalSpecies === 'gato') ||
        (
          dogSpeciesType.includes(String(animalInList?.species).toLowerCase()) && 
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