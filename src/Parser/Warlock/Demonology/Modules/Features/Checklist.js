import React from 'react';
import SPELLS from 'common/SPELLS';
import CoreChecklist, { Requirement, Rule } from 'Parser/Core/Modules/Features/Checklist';
import SpellLink from 'common/SpellLink';
import {PreparationRule} from 'Parser/Core/Modules/Features/Checklist/Rules';
import {GenericCastEfficiencyRequirement} from 'Parser/Core/Modules/Features/Checklist/Requirements';
import CastEfficiency from 'Parser/Core/Modules/CastEfficiency';
import Combatants from 'Parser/Core/Modules/Combatants';
import Abilities from 'Parser/Core/Modules/Abilities';
import LegendaryUpgradeChecker from 'Parser/Core/Modules/Items/LegendaryUpgradeChecker';
import PrePotion from 'Parser/Core/Modules/Items/PrePotion';
import EnchantChecker from 'Parser/Core/Modules/Items/EnchantChecker';
import SoulShardDetails from 'Parser/Warlock/Demonology/Modules/SoulShards/SoulShardDetails';
import SoulShardTracker from 'Parser/Warlock/Demonology/Modules/SoulShards/SoulShardTracker';
import AlwaysBeCasting from 'Parser/Warlock/Demonology/Modules/Features/AlwaysBeCasting';
import LegendaryCountChecker from 'Parser/Core/Modules/Items/LegendaryCountChecker';
import DoomguardInfernal from 'Parser/Warlock/Demonology/Modules/Features/DoomguardInfernal';
import Felstorm from 'Parser/Warlock/Demonology/Modules/Features/Felstorm';
import AbilityTracker from 'Parser/Core/Modules/Combatants';
import DoomUptime from 'Parser/Warlock/Demonology/Modules/Features/DoomUptime';
import DemonicEmpowerment from 'Parser/Warlock/Demonology/Modules/Features/DemonicEmpowerment';



class Checklist extends CoreChecklist{
  static dependencies = {
    abilities: Abilities,
    abilityTracker: AbilityTracker,
    combatants : Combatants,
    castEfficiency: CastEfficiency,
    alwaysBeCasting: AlwaysBeCasting,
    legendaryUpgradeChecker: LegendaryUpgradeChecker,
    legendaryCountChecker: LegendaryCountChecker,
    prePotion: PrePotion,
    doomguardInfernal : DoomguardInfernal,
    felstorm: Felstorm,
    enchantChecker: EnchantChecker,
    soulShardDetails: SoulShardDetails,
    soulShardTracker: SoulShardTracker,
    doomUptime: DoomUptime,
    demonicEmpowerment: DemonicEmpowerment,
  };


  rules = [
    new Rule({
      name: 'Use your core spells',
      description: 'Make sure you\'re following your rotation closely in order to maximize DPS.',
      requirements: () => {
        return [
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.CALL_DREADSTALKERS,
            onlyWithSuggestion: false,
          }),
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.DOOM.id} icon /> Uptime</React.Fragment>,
            check: () => this.doomUptime.suggestionThresholds,
          }),
        ];
      },
    }),

    new Rule({
      name: 'Maintain Demonic Empowerment on Demons',
      decription: 'High Demonic Empowerment uptime on your summoned demons is a key part of high DPS.',
      requirements: () => {
        const combatant = this.combatants.selected;
        return[
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.DEMONIC_EMPOWERMENT.id} icon /> Main Pet Uptime</React.Fragment>,
            check: () => this.demonicEmpowerment.petSuggestionThresholds,
          }),
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.CALL_DREADSTALKERS.id} icon /> Empowerment Uptime</React.Fragment>,
            check:() => this.demonicEmpowerment.callDreadstalkerSuggestionThresholds,
          }),
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.HAND_OF_GULDAN_CAST.id} icon /> Empowerment Uptime</React.Fragment>,
            check: () => this.demonicEmpowerment.hogSuggestionThresholds,
          }),
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.SUMMON_DOOMGUARD_UNTALENTED.id} icon />/<SpellLink id={SPELLS.SUMMON_INFERNAL_UNTALENTED.id} icon /> Empowerment Uptime</React.Fragment>,
            check: () => this.demonicEmpowerment.cdDemonSuggestionThresholds,
            when: !combatant.hasTalent(SPELLS.GRIMOIRE_OF_SUPREMACY_TALENT.id),
          }),
        ];
      },
    }),

    new Rule({
      name: 'Don\'t cap your Soul Shards',
      description: 'Avoid overcapping Soul Shards.',
      requirements: () => {
        return [
          new Requirement({
            name: 'Wasted shards per minute',
            check: () => this.soulShardDetails.suggestionThresholds,
            valueTooltip: `You wasted ${this.soulShardTracker.shardsWasted} shards and spent ${this.soulShardTracker.timeOnFullShardsSeconds} seconds on full shards`,
          }),
        ];
      },
    }),

    new Rule({
      name: 'Use your offensive cooldowns',
      description: 'Be mindful of your cooldowns if you are specced into them and use them when it\'s appropriate. It\'s okay to hold a cooldown for a little bit when the encounter requires it (burn phases), but generally speaking you should use them as much as you can.',
      requirements: () => {
        const combatant = this.combatants.selected;
        return [
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.SUMMON_DOOMGUARD_UNTALENTED.id} icon />/<SpellLink id={SPELLS.SUMMON_INFERNAL_UNTALENTED.id} icon /> Casts</React.Fragment>,
            check: () => this.doomguardInfernal.suggestionThresholds,
            when: !combatant.hasTalent(SPELLS.GRIMOIRE_OF_SUPREMACY_TALENT.id),
          }),
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.GRIMOIRE_FELGUARD,
            when: combatant.hasTalent(SPELLS.GRIMOIRE_OF_SERVICE_TALENT.id),
          }),
          new Requirement({
            name: <React.Fragment><SpellLink id={SPELLS.FELSTORM_BUFF.id} icon /></React.Fragment>,
            check: () => this.felstorm.suggestionThresholds,
          }),
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.SOUL_HARVEST_TALENT,
            when: combatant.hasTalent(SPELLS.SOUL_HARVEST_TALENT.id),
          }),
        ];
      },
    }),

    new Rule({
      name: 'Use your defensive and utility spells.',
      description: <React.Fragment>Use other spells in your toolkit to your advantage. For example, you can try to minimize necessary movement by using <SpellLink id={SPELLS.DEMONIC_GATEWAY_CAST.id} icon />, <SpellLink id={SPELLS.DEMONIC_CIRCLE_TALENT.id} icon />, <SpellLink id={SPELLS.BURNING_RUSH_TALENT.id} icon /> or mitigate incoming damage with <SpellLink id={SPELLS.UNENDING_RESOLVE.id} icon />/<SpellLink id={SPELLS.DARK_PACT_TALENT.id} icon />.<br />
        While you shouldn't cast these defensives on cooldown, be aware of them and use them whenever effective. Not using them at all indicates you might not be aware of them or not using them optimally.</React.Fragment>,
      requirements: () => {
        const combatant = this.combatants.selected;
        return [
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.DEMONIC_CIRCLE_TALENT_TELEPORT,
            when: combatant.hasTalent(SPELLS.DEMONIC_CIRCLE_TALENT.id),
          }),
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.DARK_PACT_TALENT,
            when: combatant.hasTalent(SPELLS.DARK_PACT_TALENT.id),
          }),
          new GenericCastEfficiencyRequirement({
            spell: SPELLS.UNENDING_RESOLVE,
            onlyWithSuggestion: false,
          }),
        ];
      },
    }),

    new Rule({
      name: 'Always be casting',
      description: 'Avoid doing nothing at any point during the fight. Use filler spells like Shadowbolt and Demonwrath when moving.',
      requirements: () => {
        return [
          new Requirement({
            name: 'Downtime',
            check: () => this.alwaysBeCasting.suggestionThresholds,
          }),
        ];
      },
    }),

    new PreparationRule(),
  ]
}

export default Checklist;

