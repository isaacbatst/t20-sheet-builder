import {SheetBuilderError} from '../../../../errors';
import {AbilityEffects} from '../../../Ability';
import {type SheetInterface} from '../../../Sheet/SheetInterface';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {type SkillName} from '../../../Skill';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialistEffect} from './SpecialistEffect';

export class Specialist extends RoleAbility {
	override effects: AbilityEffects<{
		triggered: {
			default: SpecialistEffect;
		};
	}>;

	constructor(skills: Set<SkillName>) {
		super(RoleAbilityName.specialist);
		this.effects = new AbilityEffects({
			triggered: {
				default: new SpecialistEffect(skills),
			},
		});
	}

	override addToSheet(transaction: TransactionInterface): void {
		this.validateSkills(transaction.sheet);
		super.addToSheet(transaction);
	}

	getSkills() {
		return this.effects.triggered.default.getSkills();
	}

	private validateSkills(sheet: SheetInterface) {
		const {intelligence} = sheet.getSheetAttributes().getValues();

		const allowedSkills = intelligence > 0 ? intelligence : 1;

		if (this.getSkills().length !== allowedSkills) {
			throw new SheetBuilderError('INVALID_SPECIALIST_SKILLS_SIZE');
		}

		const sheetSkills = sheet.getSheetSkills().getSkills();

		const isEverySkillTrained = this.getSkills()
			.every(specialistSkill => sheetSkills[specialistSkill].getIsTrained());

		if (!isEverySkillTrained) {
			throw new SheetBuilderError('INVALID_SPECIALIST_SKILLS_NOT_TRAINED');
		}
	}
}
