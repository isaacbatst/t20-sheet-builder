import {Level} from './Levels';
import {ManaPoints} from './ManaPoints';
import {Modifier} from './Modifier/Modifier';
import {PerLevelModifier} from './Modifier/PerLevelModifier';
import {ModifiersList} from './ModifierList';
import {OutGameContext} from './OutOfGameContext';
import {PerLevelModifiersList} from './PerLevelModifiersList';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import {RoleFake} from './RoleFake';

describe('ManaPoinst', () => {
	it('should calculate max on level one', () => {
		const context = new OutGameContext();
		const role = new RoleFake();

		const manaPoints = new ManaPoints({
			context,
			role,
			level: Level.levelOne,
			modifiers: new ModifiersList(),
			perLevelModifiers: new PerLevelModifiersList(),
		});

		const max = manaPoints.getMax({context, level: Level.levelOne, role});

		expect(max).toBe(5);
	});
	it('should calculate max on level two', () => {
		const context = new OutGameContext();
		const role = new RoleFake();

		const manaPoints = new ManaPoints({
			context,
			role,
			level: Level.levelOne,
			modifiers: new ModifiersList(),
			perLevelModifiers: new PerLevelModifiersList(),
		});

		const max = manaPoints.getMax({context, level: Level.levelTwo, role});

		expect(max).toBe(10);
	});
	it('should calculate max with fixed modifier', () => {
		const context = new OutGameContext();
		const role = new RoleFake();
		const modifiersList = new ModifiersList();
		modifiersList.add(new Modifier(RaceAbilityName.hardAsRock, 3));
		const manaPoints = new ManaPoints({
			context,
			role,
			level: Level.levelOne,
			modifiers: modifiersList,
			perLevelModifiers: new PerLevelModifiersList(),
		});

		const max = manaPoints.getMax({context, level: Level.levelTwo, role});

		expect(max).toBe(13);
	});

	it('should calculate max with perlevel modifier', () => {
		const context = new OutGameContext();
		const role = new RoleFake();
		const modifiersList = new ModifiersList();
		modifiersList.add(new Modifier(RaceAbilityName.hardAsRock, 3));
		const perLevelModifiers = new PerLevelModifiersList();
		perLevelModifiers.add(new PerLevelModifier(1, true, RaceAbilityName.hardAsRock));
		const manaPoints = new ManaPoints({
			context,
			role,
			level: Level.levelOne,
			modifiers: modifiersList,
			perLevelModifiers,
		});

		const max = manaPoints.getMax({context, level: Level.levelTwo, role});

		expect(max).toBe(14);
	});
});
