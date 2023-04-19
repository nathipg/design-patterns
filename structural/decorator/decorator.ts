const EMPTY_FUNCTION = () => {};

interface ICharacter {
  build(): ICharacter;
  printType?(): string;
  attack?(): void;
  powerAttack?(): void;
  heal?(): void;
  defend?(): void;
}

class Character implements ICharacter {
  build(): ICharacter {
    return {
      ...this,
      printType: (): string => {
        return 'Character';
      },
      attack: () => {
        console.log('Attack');
      },
    };
  }
}

class CharacterDecorator implements ICharacter {
  protected character: ICharacter;

  constructor(character: ICharacter) {
    this.character = character;
  }

  build(): ICharacter {
    return this.character.build();
  }
}

class WithPowerAttack extends CharacterDecorator {
  build(): ICharacter {
    const buildedCharacter = this.character.build();
    const { printType = EMPTY_FUNCTION } = buildedCharacter;

    return {
      ...buildedCharacter,
      printType: (): string => {
        return `${printType()} With Power Attack`;
      },
      powerAttack: () => {
        console.log('Power Attack');
      },
    };
  }
}

class WithHeal extends CharacterDecorator {
  build(): ICharacter {
    const buildedCharacter = this.character.build();
    const { printType = EMPTY_FUNCTION } = buildedCharacter;

    return {
      ...buildedCharacter,
      printType: (): string => {
        return `${printType()} With Heal`;
      },
      heal: () => {
        console.log('Heal');
      },
    };
  }
}

class WithDefense extends CharacterDecorator {
  build(): ICharacter {
    const buildedCharacter = this.character.build();
    const { printType = EMPTY_FUNCTION } = buildedCharacter;

    return {
      ...buildedCharacter,
      printType: (): string => {
        return `${printType()} With Defense`;
      },
      defend: () => {
        console.log('Defense');
      },
    };
  }
}

const app = (character: ICharacter) => {
  const buildedCharacter = character.build();

  const {
    attack = EMPTY_FUNCTION,
    defend = EMPTY_FUNCTION,
    heal = EMPTY_FUNCTION,
    powerAttack = EMPTY_FUNCTION,
    printType = EMPTY_FUNCTION,
  } = buildedCharacter;

  console.log(`\n=== ${printType()} ===`);
  attack();
  defend();
  heal();
  powerAttack();
};

const defaultCharacter = new Character();

app(defaultCharacter);

const characterWithPowerAttack = new WithPowerAttack(defaultCharacter);
const characterWithDefense = new WithDefense(defaultCharacter);
const characterWithHeal = new WithHeal(defaultCharacter);

app(characterWithPowerAttack);
app(characterWithDefense);
app(characterWithHeal);

const characterWithPowerAttackAndDefense = new WithDefense(
  characterWithPowerAttack
);
const characterWithPowerAttackAndHeal = new WithHeal(characterWithPowerAttack);
const characterWithDefenseAndHeal = new WithHeal(characterWithDefense);

app(characterWithPowerAttackAndDefense);
app(characterWithPowerAttackAndHeal);
app(characterWithDefenseAndHeal);

const characterGod = new WithHeal(characterWithPowerAttackAndDefense);

app(characterGod);
