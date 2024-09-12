import {Equipment} from '../Equipment';
import {ImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import {type EquipmentName} from '../EquipmentName';
import {type EquipmentToolName} from './EquipmentToolName';

export type EquipmentToolParams = {
	name: EquipmentName;
	isWieldable: boolean;
	price: number;
};

export class EquipmentTool extends Equipment<EquipmentToolName> {}
