var ff = (function(ff){

	var Monster = function(name){
		ff.Character.call(this, name);
	};

	Monster.prototype = Object.create(ff.Character.prototype);
	Monster.prototype.constructor = Monster;

	Monster.prototype.editableSkill = ko.observable("0");
	Monster.prototype.editableStamina = ko.observable("0");

	Monster.prototype.fight = function(){
		var skill = parseInt(this.editableSkill());
		this.skill.currentValue(skill);
		var stamina = parseInt(this.editableStamina());
		this.stamina.initialValue(stamina);
		this.stamina.currentValue(stamina);
	};

	ff.monsters = {
		currentMonster : new Monster('Unknown'),
		defeatedMonsters : ko.observableArray()
	};
	ff.monsters.defeatedMonsters.listKey = 'defeatedMonsters';

	return ff;
}(ff || {}));
