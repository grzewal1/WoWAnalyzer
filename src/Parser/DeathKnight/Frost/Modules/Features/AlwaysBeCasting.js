import React from 'react';

import CoreAlwaysBeCasting from 'Parser/Core/Modules/AlwaysBeCasting';

import SPELLS from 'common/SPELLS';
import { formatPercentage } from 'common/format';
import { STATISTIC_ORDER } from 'Main/StatisticBox';
import SpellLink from 'common/SpellLink';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
  static ABILITIES_ON_GCD = [
    // artifact
    SPELLS.SINDRAGOSAS_FURY_ARTIFACT.id,
    // core frost abilities
    SPELLS.FROST_STRIKE_CAST.id,
    SPELLS.OBLITERATE_CAST.id,
    SPELLS.HOWLING_BLAST.id,
    SPELLS.REMORSELESS_WINTER.id,

    // frost active talents
    SPELLS.HORN_OF_WINTER_TALENT.id,
    SPELLS.GLACIAL_ADVANCE_TALENT.id,
    SPELLS.BLINDING_SLEET_TALENT.id,
    SPELLS.FROSTSCYTHE_TALENT.id,

    // shared abilities
    SPELLS.CHAINS_OF_ICE.id,
    SPELLS.DARK_COMMAND.id,
    SPELLS.DEATH_STRIKE.id,
    SPELLS.CONTROL_UNDEAD.id,
    SPELLS.RAISE_ALLY.id,
    SPELLS.WRAITH_WALK.id,

    /*
    the following are off gcd abilities intentionally left out
    Anti Magic Shell
    Death Grip
    Mind Freeze
    Icebound Fortitude
    Obliteration
    Empower/hungering Rune Weapon
    */
  ];

  get downtimeSuggestionThresholds() {
    return {
      actual: this.downtimePercentage,
      isGreaterThan: {
        minor: 0.2,
        average: 0.35,
        major: .4,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.downtimeSuggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>Your downtime can be improved. Try to Always Be Casting (ABC), reducing time away from the boss unless due to mechanics.  If you do have to move, try casting filler spells, such as <SpellLink id={SPELLS.HOWLING_BLAST.id} /> or <SpellLink id={SPELLS.FROST_STRIKE_CAST.id} />.</React.Fragment>)
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% downtime`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`);
      });
  }

  statisticOrder = STATISTIC_ORDER.CORE(1);
}

export default AlwaysBeCasting;
