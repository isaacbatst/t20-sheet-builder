import {ArcanistFactory, ArcanistLineageType, ArcanistPathName, DamageType, SkillName, SpellName} from '../..';

describe('Arcanist Factory', () => {
	it('should create sorcerer', () => {
		const sorcerer = ArcanistFactory.makeFromParams({
			chosenSkills: [SkillName.knowledge, SkillName.diplomacy],
			path: ArcanistPathName.sorcerer,
			sorcererLineage: ArcanistLineageType.draconic,
			sorcererLineageDraconicDamageType: DamageType.acid,
			initialSpells: [SpellName.arcaneArmor, SpellName.flamesExplosion, SpellName.illusoryDisguise],
		});

		expect(sorcerer).toBeDefined();
	});
});
