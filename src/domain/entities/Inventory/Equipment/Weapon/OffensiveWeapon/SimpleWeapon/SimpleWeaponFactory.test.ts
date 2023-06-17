import {EquipmentName} from '../../../EquipmentName';
import {Club} from './Club';
import {Dagger} from './Dagger';
import {SimpleWeaponFactory} from './SimpleWeaponFactory';

describe('EquipmentFactory', () => {
	it('should make a dagger from serialized', () => {
		const dagger = SimpleWeaponFactory.makeFromSerialized({
			name: EquipmentName.dagger,
		});

		expect(dagger).toBeInstanceOf(Dagger);
	});

	it('should make a club from serialized', () => {
		const club = SimpleWeaponFactory.makeFromSerialized({
			name: EquipmentName.club,
		});

		expect(club).toBeInstanceOf(Club);
	});
});
