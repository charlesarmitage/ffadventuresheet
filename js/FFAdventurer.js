var ff = (function(ff){

	var adventurer = Object.create(new ff.Character('...'));
	ff.adventurer = initialize(adventurer);

	ff.storage = {};

	function loadStat(stat) {
		return parseInt(localStorage.getItem(stat) || 0);
	};

	function loadFromStorage(statistic){
		statistic.initialValue(loadStat("initial" + statistic.name));
		statistic.currentValue(loadStat("current" + statistic.name));
	};

	ff.storage.saveToStorage = function(statistic){
		console.log("Stat changed: " + statistic.name + ", " + statistic.currentValue());

		localStorage.setItem("initial" + statistic.name, statistic.initialValue());
		localStorage.setItem("current" + statistic.name, statistic.currentValue());
	};

	ff.storage.remove = function(statistic){
		console.log("Removing: " + statistic.name);

		localStorage.removeItem("initial" + statistic.name);
		localStorage.removeItem("current" + statistic.name);	
	}

	function subscribeToStatistic(statistic){
		console.log("Subscribing: " + statistic.name);
		statistic.currentValue.subscribe(function(newValue){
			ff.storage.saveToStorage(statistic);
		});
	}

	function addNewItem(item){
		return {
			to : function (list){
				item.count = item.count || 1;
				item.count = ko.observable(item.count);
				item.count.subscribe(function(newValue){
					localStorage.setItem(listKey, JSON.stringify(ko.toJS(list)));
				});
				list.push(item);
			}
		}		
	}

	ff.storage.connectListToStorage = function(listKey, list){
		var storedList = localStorage.getItem(listKey) || "[]";
		storedList = JSON.parse(storedList);

		for (var i = 0; i < storedList.length; i++) {
			addNewItem(storedList[i]).to(list);
		};

		list.subscribe(function(newValue){
			localStorage.setItem(listKey, JSON.stringify(ko.toJS(list)));
		});

		return list;
	}

	ff.storage.resetList = function(listKey, list){
		list.removeAll();
		localStorage.removeItem(listKey);
	}

	function initialize(adventurer){
		adventurer.luck = new ff.Statistic('Luck');
		adventurer.statistics.push(adventurer.luck);

		adventurer.name.subscribe(function(name){
			localStorage.setItem('adventurerName', name);
		});

		for(var statistic in adventurer.statistics){
			loadFromStorage(adventurer.statistics[statistic]);
			subscribeToStatistic(adventurer.statistics[statistic]);
		}

		var storedName = localStorage.getItem('adventurerName');
		if(storedName != null && storedName != 'undefined'){
			adventurer.name(storedName);
		}

		adventurer.isNameEditable = ko.observable(false);
		return adventurer;
	};

	adventurer.editName = function() { 
		adventurer.isNameEditable(true)
	};

	adventurer.toPlainStats = function(){
		var stats = ff.Character.prototype.toPlainStats.call(adventurer);
		stats.luck = adventurer.luck.currentValue();
		return stats;
	};

	adventurer.updateViewModel = function(plainAdventurer){
		ff.Character.prototype.updateViewModel.call(adventurer, plainAdventurer);
		adventurer.luck.currentValue(plainAdventurer.luck);
	};

	adventurer.reset = function(){
		for(var statistic in adventurer.statistics){
			var stat = adventurer.statistics[statistic];
			adventurer.statistics[statistic].reset();
			ff.storage.remove(stat);
		}
		ff.adventurer.equipmentItemsList([]);
		ff.adventurer.treasureItemsList([]);
		ff.adventurer.notesList([]);

		ff.storage.resetList('equipmentItemsList', adventurer.equipmentItemsList);
		ff.storage.resetList('treasureItemsList', adventurer.treasureItemsList);
	};

	adventurer.newEquipmentItem = ko.observable('');
	adventurer.equipmentItemsList = ko.observableArray();
	ff.storage.connectListToStorage('equipmentItemsList', adventurer.equipmentItemsList);

	adventurer.newTreasureItem = ko.observable('');
	adventurer.treasureItemsList = ko.observableArray();
	ff.storage.connectListToStorage('treasureItemsList', adventurer.treasureItemsList);

	adventurer.newNote = ko.observable('');
	adventurer.notesList = ko.observableArray();
	ff.storage.connectListToStorage('notesList', adventurer.notesList);

	adventurer.attack = function(monster, roundResponse){
		adventurer.lastRoundResult = ffBattle.fightRound(adventurer.toPlainStats(), monster.toPlainStats());
		adventurer.updateViewModel(adventurer.lastRoundResult.adventurer);
		monster.updateViewModel(adventurer.lastRoundResult.monster);

		roundResponse(adventurer.lastRoundResult);
	};

	adventurer.continueBattle = function(endBattleResponse){
		ffBattle.checkBattle(adventurer.lastRoundResult, endBattleResponse);
	};

	adventurer.escape = function(escapeResponse){
		adventurer.lastRoundResult = ffBattle.escape(adventurer.toPlainStats());
		adventurer.updateViewModel(adventurer.lastRoundResult.adventurer);
		escapeResponse();
	};

	adventurer.tryLuck = function(){
		ffBattle.tryLuck(adventurer.lastRoundResult.adventurer,
						 adventurer.lastRoundResult.monster,
						 adventurer.lastRoundResult);
		adventurer.updateViewModel(adventurer.lastRoundResult.adventurer);
	};

	adventurer.testLuck = function(){
		var currentLuck = adventurer.luck.currentValue();
		adventurer.luck.currentValue(currentLuck - 1);

		return currentLuck >= ff.dice.rollTwoDice().result;
	}

	return ff;
}(ff || {}));
