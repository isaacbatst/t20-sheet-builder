import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class PickGeneralPower extends Action<'pickGeneralPower'> {
	constructor(
		params: ActionSubClassParams<'pickGeneralPower'>,
	) {
		super({
			...params,
			type: 'pickGeneralPower',
		});
	}

	override execute(): void {
		const sheetPowers = this.transaction.sheet.getSheetPowers();
		sheetPowers.pickGeneralPower(this.payload.power, this.transaction, this.payload.source);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const power = Translator.getPowerTranslation(this.payload.power.name);
		return `${source}: poder ${power} escolhido.`;
	}
}
