interface ISkin {
  presentation(name: string): string;
  great(): string;
  attack(): string;
  heal(): string;
  defend(): string;
  showOff(): string;
}

class DefaultSkin implements ISkin {
  presentation(name: string): string {
    return `I'm ${name}`;
  }

  great(): string {
    return 'Hello';
  }

  attack(): string {
    return 'Regular boring attack';
  }

  heal(): string {
    return 'Regular boring heal';
  }

  defend(): string {
    return 'Regular boring defend';
  }

  showOff(): string {
    return 'Character is wearing a regular default skin, the player surely didn\'t p(l)ay enough to have better';
  }
}

class HalloweenSkin implements ISkin {
  presentation(name: string): string {
    return `I'm Scary ${name}`;
  }

  great(): string {
    return 'Heellooo, Sidney, what is your favorite scary movie?';
  }

  attack(): string {
    return 'Twisted stab, 100% effective unless you are one of the Original Characters or a member of the Core Four';
  }

  heal(): string {
    return 'Stapling your wounds';
  }

  defend(): string {
    return 'Wearing a bulletproof vest';
  }

  showOff(): string {
    return 'Character is wearing an old school white mask and a black hobby, at the best Ghostface style';
  }
}

interface CharacterStatus {
  damage: number;
  shield: number;
  cure: number;
}

abstract class Character {
  private name: string;
  protected skin: ISkin;
  private status: CharacterStatus;

  constructor(name: string, status: CharacterStatus, skin: ISkin) {
    this.name = name;
    this.status = status;
    this.skin = skin;
  }

  presentation(): string {
    return `${this.name} says "${this.skin.presentation(this.name)}"`;
  }

  great(): string {
    return `${this.name} says "${this.skin.great()}"`;
  }

  showOff(): string {
    return this.skin.showOff();
  }

  primarySkill(): string {
    return `${this.name} uses primary skill`;
  };

  secondarySkill(): string {
    return `${this.name} uses secondary skill`;
  };

  protected attack(): string {
    const text = `*Inflict ${this.status.damage} damage*`;
    return `${this.skin.attack()}\n${text}`;
  }

  protected heal(): string {
    const text = `*Heal ${this.status.cure} life points of an ally*`;
    return `${this.skin.heal()}\n${text}`;
  }

  protected defend(): string {
    const text = `*Raise a shield with ${this.status.shield} health*`;
    return `${this.skin.defend()}\n${text}`;
  }
}
 
class DPSCharacter extends Character {

  constructor(name: string, skin: ISkin) {
    const status: CharacterStatus = {
      cure: 0,
      damage: 5,
      shield: 0,
    };

    super(name, status, skin);
  }

  primarySkill(): string {
    return `${super.primarySkill()}\n${this.attack()}`;
  }

  secondarySkill(): string {
    return `${super.secondarySkill()}\n${this.attack()}\n${this.attack()}`;
  }
}

class SupportCharacter extends Character {
  
  constructor(name: string, skin: ISkin) {
    const status: CharacterStatus = {
      cure: 5,
      damage: 1,
      shield: 0,
    };

    super(name, status, skin);
  }

  primarySkill(): string {
    return `${super.primarySkill()}\n${this.heal()}`;
  }

  secondarySkill(): string {
    return `${super.secondarySkill()}\n${this.attack()}`;
  }
}

class TankCharacter extends Character {
  
  constructor(name: string, skin: ISkin) {
    const status: CharacterStatus = {
      cure: 0,
      damage: 1,
      shield: 5,
    };

    super(name, status, skin);
  }

  primarySkill(): string {  
    return `${super.primarySkill()}\n${this.defend()}`;
  }

  secondarySkill(): string {
    return `${super.secondarySkill()}\n${this.attack()}`;
  }
}

const characterClassesMapper = {
  TankCharacter,
  DPSCharacter,
  SupportCharacter,
};

const CharacterFactory = (type: string, name: string, skin: ISkin) => {
  return new characterClassesMapper[`${type}Character`](name, skin);
};

const skinClassesMapper = {
  DefaultSkin,
  HalloweenSkin,
};

const SkinFactory = (type: string) => {
  return new skinClassesMapper[`${type}Skin`]();
};

class Game {
  private game: HTMLDivElement;
  private selectCharacterScreen: HTMLDivElement;
  private playScreen: HTMLDivElement;
  private actionsDisplay: HTMLDivElement;
  private startBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private selectionForm: HTMLFormElement;

  constructor() {
    this.game = document.querySelector('#game')!;

    this.selectCharacterScreen = this.game.querySelector('#selectCharacter')!;
    this.selectionForm = this.selectCharacterScreen.querySelector('#selectionForm')!;
    this.playScreen = this.game.querySelector('#play')!;
    this.actionsDisplay = this.playScreen.querySelector('#actions')!;

    this.startBtn = this.game.querySelector('#btnStartGame')!;
    this.resetBtn = this.game.querySelector('#btnResetGame')!;

    this.attachEventListeners();
  }

  private run() {
    const characterType = this.selectionForm.character.querySelector('option:checked').parentElement.label;
    const characterName = this.selectionForm.character.value;
    const skinType = this.selectionForm.skin.value;

    const skin = SkinFactory(skinType);
    const character = CharacterFactory(characterType, characterName, skin);

    this.write(this.actionsDisplay, `
      ${character.showOff()}\n
      ${character.presentation()}\n
      ${character.great()}\n
      ${character.primarySkill()}\n
      ${character.secondarySkill()}\n
    `);
  }

  private write(screen: HTMLDivElement, text = '') {
    screen.innerText = text;
  }

  private hideAll() {
    this.game.querySelectorAll('.screen').forEach(div => div.classList.add('hidden'));
  }

  private showScreen(screen: HTMLDivElement) {
    this.hideAll();
    screen?.classList.remove('hidden');
  }

  private showSelectScreen() {
    this.showScreen(this.selectCharacterScreen);
  }

  private showPlayScreen() {
    this.run();
    this.showScreen(this.playScreen);
  }

  private attachEventListeners() {
    this.startBtn.addEventListener('click', () => this.showPlayScreen());
    this.resetBtn.addEventListener('click', () => this.showSelectScreen());
  }
}

const game = new Game();
