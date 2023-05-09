import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddEquipment extends Action<'addEquipment'> {
	constructor(params: ActionSubClassParams<'addEquipment'>) {
		super({
			...params,
			type: 'addEquipment',
		});
	}

	execute(): void {
		const sheetInventory = this.transaction.sheet.getSheetInventory();
		sheetInventory.addEquipment(this.payload.equipment);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const equipment = new Translatable(this.payload.equipment.name).getTranslation();
		return `${source}: ${equipment} adicionado ao inventário.`;
	}
}
