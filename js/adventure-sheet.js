
var AdventureSheetViewModel = (function() {
	$('.nav a').on('click', function(){
	    $(".btn-navbar").click(); //bootstrap 2.x
	    $(".navbar-toggle").click() //bootstrap 3.x by Richard
	});

	$(document).ready(function(){
		$('#statistics-summary').hide();
	});

	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
	   var hash = e.target.hash;
	   if(hash == '#Statistics'){
			$('#statistics-summary').hide()
		} else {
			$('#statistics-summary').show()
		}
	});

	this.adventurer = ff.adventurer;
	this.name = ko.observable('');

	ff.storage.connectListToStorage('defeatedMonsters', ff.monsters.defeatedMonsters);

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
		fightResult('Battle started!')
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
		return {
			to : function(itemList){
				if(newItem().length > 0){
					itemList.unshift(newItem());
				}
			}
		};
	}

	this.incrementStatistic = function(statistic){
		statistic.increment();
	};

	this.decrementStatistic = function(statistic){
		statistic.decrement();
	};

	this.startAdventure = function() {
		for(var index in ff.adventurer.statistics){
			ff.adventurer.statistics[index].initialValue(ff.adventurer.statistics[index].currentValue());
			ff.storage.saveToStorage(ff.adventurer.statistics[index]);
		}		
	}

	this.resetStats = function() {
		this.luckResult('');
		cancelMonsterEdit();
		ff.adventurer.reset();
		ff.book.branch(0);
	};		
}());
