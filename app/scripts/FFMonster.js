var ff = (function(ff){

	var Monster = function(name){
		ff.Character.call(this, name);
	};

	Monster.prototype = Object.create(ff.Character.prototype);
	Monster.prototype.constructor = Monster;

	Monster.prototype.fight = function(){
		this.skill.currentValue(parseInt(this.skill.currentValue()));
		this.stamina.currentValue(parseInt(this.stamina.currentValue()));
	};

	ff.monsters = {
		currentMonster : new Monster('Unknown'),
		defeatedMonsters : ko.observableArray()
	};
	ff.monsters.defeatedMonsters.listKey = 'defeatedMonsters';

	return ff;
}(ff || {}));
