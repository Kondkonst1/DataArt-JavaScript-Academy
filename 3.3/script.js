'use strict'

class Unit {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    getFullName = () => {
       return `This is ${this.name} ${this.surname}`;
    }
}
class Developer extends Unit {
    constructor(name, surname) {
        super(name, surname);
    }
};

class Tester extends Unit {
    constructor(name, surname) {
        super(name, surname);
    }
};

class Project {
    developers=[];
    testers = [];

    addTester = (tester) => {
        this.testers.push(tester);
    }
    addDeveloper = (dev) => {
        this.developers.push(dev);
    }
    getTeam = () => {
        return {
            developers: this.developers.map(unit => unit.getFullName()),
            testers: this.testers.map(unit => unit.getFullName())
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
