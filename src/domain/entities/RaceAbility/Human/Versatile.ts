import {TrainSkill} from '../../Action/TrainSkill';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import type {GeneralPowerName} from '../../Power/GeneralPowerName';
import {GeneralPowerFactory} from '../../Power/PowerFactory';
import {RaceName} from '../../Race/RaceName';
import type {Dispatch} from '../../SheetInterface';
import {SkillName} from '../../Skill/SkillName';
import type {Translatable} from '../../Translator';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export type VersatileChoice =
	{type: 'skill'; name: SkillName} |
	{type: 'power'; name: GeneralPowerName};

export class Versatile extends RaceAbility {
	readonly choices: VersatileChoice[] = [];

	constructor() {
		super(
			RaceAbilityName.versatile,
			'passive',
		);
	}

	addChoice(newChoice: VersatileChoice) {
		if (this.choices.length >= 2) {
			throw new Error('EXCEEDED_CHOICES_QUANTITY');
		}

		const found = this.choices.find(choice => choice.name === newChoice.name);

		if (found) {
			throw new Error('REPEATED_VERSATILE_CHOICE');
		}

		const isPreviousChoicePower = this.choices.some(choice => choice.type === 'power');

		if (newChoice.type === 'power' && isPreviousChoicePower) {
			throw new Error('FORBIDDEN_TWO_POWERS');
		}

		this.choices.push(newChoice);
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		super.addToSheet(sheet, dispatch, RaceName.human);
	}

	protected applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		if (this.choices.length !== 2) {
			throw new Error('MISSING_CHOICES');
		}

		this.choices.forEach(choice => {
			if (choice.type === 'skill') {
				dispatch(new TrainSkill({
					source: this.name,
					name: SkillName[choice.name],
				}));
			}

			if (choice.type === 'power') {
				const power = GeneralPowerFactory.make(choice.name);
				power.addToSheet(sheet, dispatch, this.name);
			}
		});
	}
}
