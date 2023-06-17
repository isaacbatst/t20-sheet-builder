import {describe} from 'vitest';
import {EquipmentFactory} from './EquipmentFactory';
import {EquipmentName} from './EquipmentName';
import {Club, Dagger} from './Weapon';

describe('EquipmentFactory', () => {
	it('should make a dagger from serialized', () => {
		const dagger = EquipmentFactory.makeFromSerialized({
			name: EquipmentName.dagger,
		});

		expect(dagger).toBeInstanceOf(Dagger);
	});

	it('should make a club from serialized', () => {
		const club = EquipmentFactory.makeFromSerialized({
			name: EquipmentName.club,
		});

		expect(club).toBeInstanceOf(Club);
	});
});
