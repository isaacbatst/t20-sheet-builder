import {type ContextInterface} from '../../Context/ContextInterface';
import {type SheetInterface} from '../SheetInterface';
import {type SerializedSheetInterface} from './SerializedSheetInterface';

/**
* @deprecated Use `sheet.serialize()` instead
*/
export class SheetSerializer {
	constructor(
		private readonly context: ContextInterface,
	) {}

	serialize(sheet: SheetInterface): SerializedSheetInterface {
		const race = sheet.getSheetRace().getRace();
		const role = sheet.getSheetRole().getRole();
		const origin = sheet.getSheetOrigin().getOrigin();
		const powers = sheet.getSheetPowers();
		return {
			buildSteps: sheet.getBuildSteps().map(buildStep => buildStep.serialize()),
			level: sheet.getLevel(),
			displacement: sheet.getSheetDisplacement().getDisplacement(),
			attributes: sheet.getSheetAttributes().getValues(),
			defense: sheet.getSheetDefense().serialize(sheet, this.context),
			money: sheet.getSheetInventory().getMoney(),
			race: race ? race.serialize() : undefined,
			role: role ? role.serialize() : undefined,
			origin: origin ? origin.serialize() : undefined,
			lifePoints: sheet.getSheetLifePoints().serialize(sheet, this.context),
			manaPoints: sheet.getSheetManaPoints().serialize(sheet, this.context),
			equipments: sheet.getSheetInventory().serialize(),
			generalPowers: powers.serializeGeneralPowers(),
			rolePowers: powers.serializeRolePowers(),
			originPowers: powers.serializeOriginPowers(),
			grantedPowers: powers.serializeGrantedPowers(),
			grantedPowersCount: sheet.getSheetDevotion().getGrantedPowerCount(),
			learnedCircles: sheet.getSheetSpells().serializeLearnedCircles(),
			proficiencies: sheet.getSheetProficiencies().getProficiencies(),
			skills: sheet.getSheetSkills().serialize(sheet, this.context),
			spells: sheet.getSheetSpells().serializeSpells(),
			tormentaPowersAttribute: sheet.getSheetAttributes().getTormentaPowersAttribute(),
			vision: sheet.getSheetVision().getVision(),
			devotion: sheet.getSheetDevotion().serialize(),
			resistencies: sheet.getSheetResistences().serialize(sheet, this.context),
		};
	}
}
