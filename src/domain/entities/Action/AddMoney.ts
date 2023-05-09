import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class AddMoney extends Action<'addMoney'> {
	constructor(
		params: ActionSubClassParams<'addMoney'>,
	) {
		super({
			...params,
			type: 'addMoney',
		});
	}

	execute(): void {
		const sheetInventory = this.transaction.sheet.getSheetInventory();
		sheetInventory.addMoney(this.payload.quantity);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const value = this.payload.quantity.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
		return `${source}: +T$${value}.`;
	}
}
