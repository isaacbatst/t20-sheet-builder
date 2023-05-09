import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class PickRolePower extends Action<'pickRolePower'> {
	constructor(
		params: ActionSubClassParams<'pickRolePower'>,
	) {
		super({
			...params,
			type: 'pickRolePower',
		});
	}

	override execute(): void {
		const sheetPowers = this.transaction.sheet.getSheetPowers();
		sheetPowers.pickRolePower(this.payload.power, this.transaction, this.payload.source);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const power = Translator.getPowerTranslation(this.payload.power.name);
		return `${source}: poder ${power} escolhido.`;
	}
}
