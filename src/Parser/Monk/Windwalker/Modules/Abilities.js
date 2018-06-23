import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';

import CoreAbilities from 'Parser/Core/Modules/Abilities';

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      {
        spell: SPELLS.FISTS_OF_FURY_CAST,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        // This can get way too low calculated cooldown if the player has a very high amount of haste, but this is not expected for windwalkers
        cooldown: (haste, combatant) =>
          24 / (1 + haste) - (combatant.hasBuff(SPELLS.SERENITY_TALENT.id) ? (combatant.hasWrists(ITEMS.DRINKING_HORN_COVER.id) ? 11 : 8) : 0),
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
          extraSuggestion: 'Delaying the cast somewhat to line up with add spawns is acceptable, however.',
        },
      },
      {
        spell: SPELLS.RISING_SUN_KICK,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        // Item - Windwalker T19 2PC Bonus: Reduces the cooldown of Rising Sun Kick by 1.0 seconds.
        cooldown: (haste, combatant) =>
          (10 - (combatant.hasBuff(SPELLS.WW_TIER19_2PC.id) ? 1 : 0)) / (1 + haste) * (combatant.hasBuff(SPELLS.SERENITY_TALENT.id) ? 0.5 : 1),
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: true,
        },
      },
      {
        spell: SPELLS.WHIRLING_DRAGON_PUNCH_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 24 / (1 + haste),
        gcd: true,
        enabled: combatant.hasTalent(SPELLS.WHIRLING_DRAGON_PUNCH_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.85,
          extraSuggestion: 'Delaying the cast somewhat to line up with add spawns is acceptable, however.',
        },
      },
      // cooldowns
      {
        spell: SPELLS.TOUCH_OF_KARMA_CAST,
        buffSpellId: SPELLS.TOUCH_OF_KARMA_CAST.id,
        category: Abilities.SPELL_CATEGORIES.SEMI_DEFENSIVE,
        cooldown: 90,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
          extraSuggestion: "Touch of Karma is typically used offensively as often as possible, but use changes a lot varying on the encounter",
        },
      },
      {
        spell: SPELLS.TOUCH_OF_DEATH,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 120,
        gcd: {
          static: 1000,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.SERENITY_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 90,
        enabled: combatant.hasTalent(SPELLS.SERENITY_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.STORM_EARTH_AND_FIRE_CAST,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 90,
        enabled: !combatant.hasTalent(SPELLS.SERENITY_TALENT.id),
        charges: 2,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.INVOKE_XUEN_THE_WHITE_TIGER_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        enabled: combatant.hasTalent(SPELLS.INVOKE_XUEN_THE_WHITE_TIGER_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 1.0,
        },
      },
      {
        spell: SPELLS.ENERGIZING_ELIXIR_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60,
        enabled: combatant.hasTalent(SPELLS.ENERGIZING_ELIXIR_TALENT.id),
      },
      // other spells
      {
        spell: SPELLS.BLACKOUT_KICK,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.TIGER_PALM,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.CHI_WAVE_TALENT,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        cooldown: 15,
        gcd: true,
        enabled: combatant.hasTalent(SPELLS.CHI_WAVE_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.65,
        },
      },
      {
        spell: SPELLS.SPINNING_CRANE_KICK,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.CHI_BURST_TALENT,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        cooldown: 30,
        gcd: true,
      },
      {
        spell: SPELLS.LEG_SWEEP_TALENT,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        cooldown: 60,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.RING_OF_PEACE_TALENT,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        cooldown: 45,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.CRACKLING_JADE_LIGHTNING,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.PARALYSIS,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 45,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.EFFUSE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: [SPELLS.TRANSCENDENCE, SPELLS.TRANSCENDENCE_TRANSFER],
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 10,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.FLYING_SERPENT_KICK,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 25,
        gcd: {
          static: 1000,
        },
      },
      {
        spell: SPELLS.RUSHING_JADE_WIND_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        cooldown: haste => 6 / (1 + haste),
        gcd: {
          static: 1000,
        },
        enabled: combatant.hasTalent(SPELLS.RUSHING_JADE_WIND_TALENT.id),
      },
      // Defensives
      {
        spell: SPELLS.DIFFUSE_MAGIC_TALENT,
        buffSpellId: SPELLS.DIFFUSE_MAGIC_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 90,
        enabled: combatant.hasTalent(SPELLS.DIFFUSE_MAGIC_TALENT.id),
      },
      {
        spell: SPELLS.DAMPEN_HARM_TALENT,
        buffSpellId: SPELLS.DAMPEN_HARM_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 90,
        enabled: combatant.hasTalent(SPELLS.DAMPEN_HARM_TALENT.id),
      },
    ];
  }
}

export default Abilities;