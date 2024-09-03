import {SheetBuilderError} from '../../../errors';
import {WeaponFactory} from '../../Inventory/Equipment/Weapon/WeaponFactory';
import {Acolyte} from '../Acolyte/Acolyte';
import {Amnesic} from '../Amnesic/Amnesic';
import {AnimalsFriend} from '../AnimalsFriend/AnimalsFriend';
import {Aristocrat} from '../Aristocrat';
import {Artisan} from '../Artisan/Artisan';
import {OriginBenefitFactoryAcolyte} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryAcolyte';
import {OriginBenefitFactoryAnimalsFriend} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryAnimalsFriend';
import {OriginName} from '../OriginName';
import {type SerializedOrigin, type SerializedSheetOrigin} from '../SerializedOrigin';

export class OriginFactory {
	static makeFromSerialized<T extends SerializedOrigin>(serialized: SerializedSheetOrigin<T>) {
		if (serialized.name === OriginName.acolyte) {
			const benefitFactory = new OriginBenefitFactoryAcolyte();
			const benefits = serialized.chosenBenefits.map(benefitFactory.makeFromSerialized);
			return new Acolyte(benefits);
		}

		if (serialized.name === OriginName.animalsFriend) {
			const benefitFactory = new OriginBenefitFactoryAnimalsFriend();
			const benefits = serialized.chosenBenefits.map(benefitFactory.makeFromSerialized);
			return new AnimalsFriend(benefits, serialized.chosenAnimal);
		}

		if (serialized.name === OriginName.amnesic) {
			if (!serialized.equipments.some(e => !(e.name in WeaponFactory.weapons))) {
				throw new SheetBuilderError('ORIGIN_AMNESIC_SUPPORTS_ONLY_WEAPONS');
			}

			const equipments = serialized.equipments.map(e => WeaponFactory.make(e.name));
			return new Amnesic(equipments);
		}

		if (serialized.name === OriginName.artisan) {
			return Artisan.fromSerialized(serialized);
		}

		if (serialized.name === OriginName.aristocrat) {
			return Aristocrat.fromSerialized(serialized);
		}

		throw new SheetBuilderError('UNKNOWN_ORIGIN');
	}
}
