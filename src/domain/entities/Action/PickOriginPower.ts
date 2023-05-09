import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class PickOriginPower extends Action<'pickOriginPower'> {
	constructor(
		params: ActionSubClassParams<'pickOriginPower'>,
	) {
		super({
			...params,
			type: 'pickOriginPower',
		});
	}

	override execute(): void {
		const sheetPowers = this.transaction.sheet.getSheetPowers();
		sheetPowers.pickOriginPower(this.payload.power, this.transaction, this.payload.source);
	}

	getDescription(): string {
		const power = Translator.getPowerTranslation(this.payload.power.name);
		return `Poder de origem: ${power} escolhido.`;
	}
}
