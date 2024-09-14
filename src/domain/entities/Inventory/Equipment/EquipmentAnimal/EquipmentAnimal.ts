import {Equipment} from '../Equipment';
import {type EquipmentAnimalData} from './EquipmentAnimalData';
import {type EquipmentAnimalName} from './EquipmentAnimalName';

export class EquipmentAnimal extends Equipment<
EquipmentAnimalName,
EquipmentAnimalData<EquipmentAnimalName>
> {}
