var ff = (function(ff){

	var Monster = function(name){
		ff.Character.call(this, name);
	};

	Monster.prototype = Object.create(ff.Character.prototype);
	Monster.prototype.constructor = Monster;

	Monster.prototype.fight = function(){
		var skill = parseInt(this.editableSkill());
		this.skill.currentValue(skill);
		var stamina = parseInt(this.editableStamina());
		this.stamina.currentValue(stamina);
	};

	Monster.prototype.editableSkill = ko.observable("0");
	Monster.prototype.editableStamina = ko.observable("0");

	var monstersViewModel = {
		currentMonster : new Monster('Unknown'),
		defeatedMonsters : ko.observableArray()
	};
	monstersViewModel.defeatedMonsters.listKey = 'defeatedMonsters';

	ff.monsters = monstersViewModel;
	return ff;
}(ff || {}));
