import {Equipment} from '../Equipment';
import {type EquipmentAlchemicCategory} from './EquipmentAlchemicCategory';

export abstract class EquipmentAlchemic extends Equipment {
	override categoryForImprovement = null;
	abstract alchemicCategory: EquipmentAlchemicCategory;
	abstract description: string;
}
