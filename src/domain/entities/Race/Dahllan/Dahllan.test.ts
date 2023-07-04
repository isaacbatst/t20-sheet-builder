import {describe, it, expect} from 'vitest';
import {ApplyRaceModifiers} from '../../Action/ApplyRaceModifiers';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {Dahllan} from './Dahllan';
import {LearnSpell} from '../../Action/LearnSpell';
import {RaceAbilityName} from '../RaceAbilityName';
import {ControlPlants} from '../../Spell/ControlPlants/ControlPlants';
import {ApplyRaceAbility} from '../../Action/ApplyRaceAbility';
import {WildEmpathy} from '../../Ability/common/WildEmpathy';
import {FixedModifier} from '../../Modifier';

describe('Dahllan', () => {
	it('should apply +2 to wisdom, +1 to dexterity and -1 to intelligence', () => {
		const dahllan = new Dahllan();
		const transaction = new TransactionFake();
		dahllan.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new ApplyRaceModifiers({
			payload: {
				modifiers: {
					wisdom: 2,
					dexterity: 1,
					intelligence: -1,
				},
			},
			transaction,
		}));
	});

	it('should learn Control Plants', () => {
		const dahllan = new Dahllan();
		const transaction = new TransactionFake();
		dahllan.addToSheet(transaction);
		expect(transaction.run).toHaveBeenCalledWith(new LearnSpell({
			payload: {
				source: RaceAbilityName.plantsFriend,
				spell: new ControlPlants(),
				needsCircle: false,
			},
			transaction,
		}));
	});

	it('should have Allihanna Armor ability', () => {
		const dahllan = new Dahllan();
		const transaction = new TransactionFake();
		dahllan.addToSheet(transaction);
		expect(transaction.sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.has(RaceAbilityName.allihannaArmor)).toBeTruthy();
	});

	it('should have Wild Empathy ability', () => {
		const dahllan = new Dahllan();
		const transaction = new TransactionFake();
		dahllan.addToSheet(transaction);
		expect(transaction.sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.has(RaceAbilityName.wildEmpathy)).toBeTruthy();
	});

	it('should add animal handling bonus if apply repeated Wild Empathy', () => {
		const dahllan = new Dahllan();
		const transaction = new TransactionFake();
		dahllan.addToSheet(transaction);
		transaction.run(new ApplyRaceAbility({
			payload: {
				ability: new WildEmpathy(),
				source: RaceAbilityName.wildEmpathy,
			},
			transaction,
		}));
		const {animalHandling} = transaction.sheet.getSheetSkills().getSkills();
		expect(animalHandling.fixedModifiers.modifiers).toHaveLength(1);
		expect(animalHandling.fixedModifiers.modifiers).toContainEqual(new FixedModifier(RaceAbilityName.wildEmpathy, 2));
	});
});
