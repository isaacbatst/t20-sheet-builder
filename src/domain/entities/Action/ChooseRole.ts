import {type BuildingSheet} from '../Sheet';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ChooseRole extends Action<'chooseRole', BuildingSheet> {
	constructor(
		params: ActionSubClassParams<'chooseRole', BuildingSheet>,
	) {
		super({
			...params,
			type: 'chooseRole',
		});
	}

	override execute(): void {
		const sheetRole = this.transaction.sheet.getSheetRole();
		sheetRole.chooseRole(this.payload.role, this.transaction);
	}

	getDescription(): string {
		const role = Translator.getRoleTranslation(this.payload.role.name);
		const {initialLifePoints, manaPerLevel} = this.payload.role;
		const initialSkills = this.payload.role.getTotalInitialSkills();

		return `Classe escolhida: ${role}. ${initialLifePoints} PV, ${manaPerLevel} PM e ${initialSkills} perícias iniciais.`;
	}
}
