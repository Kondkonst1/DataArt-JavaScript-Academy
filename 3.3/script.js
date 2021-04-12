'use strict'

class Unit {
    constructor(name, surname) {
        this._name = name;
        this._surname = surname;
        // this.getTeam = this.getTeam.bind(this); //жесткая привязка контекста
    }
   get fullName  ()  {
       return `${this._name} ${this._surname}`;
    }
    set fullName(newValue){
        const [name, surname] = newValue.split(" ");
        this._name = name;
        this._surname = surname;
    }
}
class Developer extends Unit {};
class Tester extends Unit {};

class Project {
    developers=[];
    testers = [];

    addTester  (tester)  {
        this.testers.push(tester);
    }
    addDeveloper (dev)  {
        this.developers.push(dev);
    }
    getTeam () {
        return {
            developers: this.developers.map(unit => unit.fullName),
            testers: this.testers.map(unit => unit.fullName)
        }
    }
}

const customPrj = new Project();
const dev1 = new Developer("Arlinda", "Cruz");
const dev2 = new Developer("Grayson", "Kumar");
const dev3 = new Developer("Cesar", "Dominguez");

const test1 = new Tester("Vicenta", "Blanco");
const test2 = new Tester("Naomi", "Thomas");

customPrj.addDeveloper(dev1);
customPrj.addDeveloper(dev2);
customPrj.addDeveloper(dev3);
customPrj.addTester(test1);
customPrj.addTester(test2);

console.log(customPrj.getTeam());
