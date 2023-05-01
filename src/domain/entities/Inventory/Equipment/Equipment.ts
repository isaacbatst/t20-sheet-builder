import type {EquipmentName} from './EquipmentName';

export abstract class Equipment {
	abstract readonly name: EquipmentName;
}
