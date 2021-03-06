
var AdventureSheetViewModel = (function() {

	this.adventurer = ff.adventurer;
	this.name = ko.observable('');

	ff.storage.connectListToStorage(ff.monsters.defeatedMonsters);

	this.rollOneDie = function(){
		ff.book.diceResult(ff.dice.rollOneDie().text);
	}
	this.rollTwoDice = function(){
		ff.book.diceResult(ff.dice.rollTwoDice().text);
	}

	this.fightResult = ko.observable('Edit new monster');
	this.attack = function(monster, logResult){
		ff.adventurer.attack(monster, function(roundResult){

			logResult(ffFormat.formatBattleRound(roundResult));

			ff.adventurer.continueBattle({
				monsterDefeated : function(defeatedMonster){
					logResult('Monster defeated!');
					ff.monsters.defeatedMonsters.push(defeatedMonster);
					endBattle();
				},

				adventurerDefeated : function(defeatedAdventurer){
					logResult('You lose!');
					endBattle();
				}
			})
		});
	};

	this.escape = function(){
		ff.adventurer.escape(function(){
			endBattle();
		});
	};

	this.cancel = function(){
		endBattle();
	}

	this.luckResult = ko.observable('');
	this.testLuck = function(){
		var isLucky = ff.adventurer.testLuck();
		if(isLucky){
			this.luckResult('Lucky');
		} else {
			this.luckResult('Unlucky');
		}
	};

	function endBattle(){
		fightResult('');
		$('#defeated-monster-list').show('blind');
		$('#monster-edit-dialog').hide('blind');
	    $('#fight-dialog').hide('blind');
	};

	this.editMonster = function(){
		$('#defeated-monster-list').hide('blind');
		$('#monster-edit-dialog').show('blind');
	    $('#fight-dialog').hide('blind');
	};

	this.monsters = ff.monsters;
	this.fightMonster = function(){
		fightResult('Battle started!<br><br><br>')
		ff.monsters.currentMonster.fight();
		$('#defeated-monster-list').hide('blind');
		$('#monster-edit-dialog').hide('blind');
	    $('#fight-dialog').show('blind');
	};

	this.cancelMonsterEdit = function(){
		fightResult('');
		$('#defeated-monster-list').show('blind');
		$('#monster-edit-dialog').hide('blind');
	    $('#fight-dialog').hide('blind');
	}

	this.addItem = function(newItem){
		var newItemName = newItem();

		return {
			to : function(itemList){
				if(newItemName.length > 0){
					var item = {
						name : newItemName,
						count : ko.observable(1),
					};
					itemList.unshift(item);
					newItem("");
				}
			}
		};
	};

	this.removeItem = function(itemList, index){
		if(index == itemList.length - 1)
		{
			return itemList.splice(-1);
		}
		itemList.splice(index, 1);
	};

	this.incrementItem = function(list, index){
		var item = list()[index];
		item.count = item.count || ko.observable(1);
		item.count(item.count() + 1);
	}

	this.decrementItem = function(list, index){
		var item = list()[index];
		item.count = item.count || ko.observable(1);
		item.count(item.count() - 1);
	}

	this.incrementStatistic = function(statistic){
		statistic.increment();
	};

	this.decrementStatistic = function(statistic){
		statistic.decrement();
	};

	this.incrementInitialStatistic = function(statistic){
		statistic.incrementInitial();
	};

	this.decrementInitialStatistic = function(statistic){
		statistic.decrementInitial();
	};

	this.startAdventure = function() {
		for(var index in ff.adventurer.statistics){
			ff.adventurer.statistics[index].currentValue(ff.adventurer.statistics[index].initialValue());
			ff.storage.saveToStorage(ff.adventurer.statistics[index]);
		}		
	}

	this.resetStats = function() {
		this.luckResult('');
		cancelMonsterEdit();
		ff.adventurer.reset();
		ff.storage.resetList(ff.monsters.defeatedMonsters);
		ff.book.branch(0);
	};
	
}());
