import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddInitialEquipment extends Action<'addInitialEquipment'> {
	constructor(params: ActionSubClassParams<'addInitialEquipment'>) {
		super({
			...params,
			type: 'addInitialEquipment',
		});
	}

	execute(): void {
		const sheetInventory = this.transaction.sheet.getSheetInventory();
		sheetInventory.addInitialEquipment(this.payload, this.transaction);
	}

	getDescription(): string {
		const simpleWeapon = new Translatable(this.payload.simpleWeapon.name).getTranslation();
		const armor = this.payload.armor ? new Translatable(this.payload.armor.name).getTranslation() : undefined;
		const martialWeapon = this.payload.martialWeapon ? new Translatable(this.payload.martialWeapon.name).getTranslation() : undefined;
		const weapons = `${simpleWeapon}${armor ? `, ${armor}` : ''}${martialWeapon ? `, ${martialWeapon}` : ''}`;
		return `Equipamento inicial adicionado: ${weapons}.`;
	}
}
