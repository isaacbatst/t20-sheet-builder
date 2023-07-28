import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class PickGrantedPower extends Action<'pickGrantedPower'> {
	constructor(
		params: ActionSubClassParams<'pickGrantedPower'>,
	) {
		super({
			...params,
			type: 'pickGrantedPower',
		});
	}

	override execute(): void {
		const sheetPowers = this.transaction.sheet.getSheetPowers();
		sheetPowers.pickGrantedPower(this.payload.power, this.transaction, this.payload.source);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const power = Translator.getPowerTranslation(this.payload.power.name);
		return `${source}: poder ${power} escolhido.`;
	}
}
