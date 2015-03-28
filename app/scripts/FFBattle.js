var ffBattle = (function(ff){

	var ffBattle = {};

	function woundCombatant(combatant, numberOfWounds){
		combatant.stamina -= numberOfWounds;
		combatant.stamina = combatant.stamina < 0 ? 0 : combatant.stamina;
	}

	ffBattle.fightRound = function(adventurer, monster){
	  var adventurerScore = ff.dice.rollTwoDice().add(adventurer.skill);
	  var monsterScore = ff.dice.rollTwoDice().add(monster.skill);
	  var attackerResults = 'Adventurer: ' + adventurerScore.text + ' Monster: ' + monsterScore.text;

	  var roundWinner = 'Draw';
	  if(adventurerScore.result > monsterScore.result){
	    woundCombatant(monster, 2);
	    roundWinner = 'Adventurer';
	  } else if(monsterScore.result > adventurerScore.result){
	    woundCombatant(adventurer, 2);
	    roundWinner = 'Monster';
	  }

	  return {
		isLuckUsed : false,
	  	monster : monster,
	  	adventurer : adventurer,
	  	adventurerResult : adventurerScore,
	  	monsterResult : monsterScore,
	  	winner : roundWinner
	  };
	};

	ffBattle.checkBattle = function(result, callbacks){
		if(result.monster.stamina <= 0){
			callbacks.monsterDefeated(result.monster);
		} else if(result.adventurer.stamina <= 0){
			callbacks.adventurerDefeated(result.adventurer);
		}
	};

	ffBattle.escape = function(adventurer){
		adventurer.stamina -= 2;
		return {
			isLuckUsed : false,
			winner : 'Monster',
			isBattleOver : true,
			adventurer : adventurer
		};
	};

	ffBattle.isEscapable = function(adventurer){
		return adventurer.stamina > 2;
	};

	function applyLuckSuccess(adventurer, monster, roundResult) {
		if(roundResult.winner == 'Monster'){
			adventurer.stamina += 1;
		} else if(roundResult.winner == 'Adventurer'){
	    	woundCombatant(monster, 2);
		} else {
			adventurer.luck += 1;
		}		
	}

	function applyLuckFailure(adventurer, monster, roundResult) {
		if(roundResult.winner == 'Monster'){
			woundCombatant(adventurer, 1);
		} else if(roundResult.winner == 'Adventurer'){
			monster.stamina += 1;
		} else {
			adventurer.luck += 1;
		}		
	}

	ffBattle.tryLuck = function(adventurer, monster, roundResult){
		if(roundResult.isLuckUsed){
			return;
		} 

		roundResult.isLuckUsed = true;
		var currentLuck = adventurer.luck;
		adventurer.luck -= 1;

		if(currentLuck >= ff.dice.rollTwoDice().result){
			applyLuckSuccess(adventurer, monster, roundResult);
		} else {
			applyLuckFailure(adventurer, monster, roundResult);
		}
	};

	return ffBattle;
}(ff));

var ffFormat = (function(){
	function formatBattleRoundResult(result){
		var winnerText = result.winner + ' hits!';
		if(result.winner == 'Draw'){
			winnerText = 'Draw!';
		}

		return 'Adventurer: ' 
				+ result.adventurerResult.text + '<br>'
				+ 'Monster: ' 
				+ result.monsterResult.text + '<br>'
				+ winnerText;
	};

	return {
		formatBattleRound : formatBattleRoundResult
	};
}(ff));
