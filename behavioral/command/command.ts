interface Command {
  execute(): void;
}

enum CommandName {
  COPY = 'COPY',
  CUT = 'CUT',
  PASTE = 'PASTE',
}

type CommandRecord = Record<string, Command>;

class CommandManager {
  private commands: CommandRecord = {};

  register(name: CommandName, command: Command) {
    this.commands[name] = command;
  }

  execute(name: CommandName) {
    this.commands[name].execute();
  }
}

class CopyCommand implements Command {
  execute() {
    console.log('Copy');
  }
}

class CutCommand implements Command {
  execute() {
    console.log('Cut');
  }
}

class PasteCommand implements Command {
  execute() {
    console.log('Paste');
  }
}

class UIEventHandler {
  private commandManager: CommandManager;
  private commandName: CommandName;

  constructor(commandManager: CommandManager, commandName: CommandName) {
    this.commandManager = commandManager;
    this.commandName = commandName;
  }

  actionHandler() {
    this.commandManager.execute(this.commandName);
  }
}

class Button {
  private label: string;
  private onClick: UIEventHandler;

  constructor(label: string, onClick: UIEventHandler) {
    this.label = label;
    this.onClick = onClick;
  }

  getLabel() {
    return this.label;
  }

  click() {
    this.onClick.actionHandler();
  }
}

const render = (buttonList: Button[]) => {
  const buttonsContainer = document.getElementById('buttons-container');

  if (!buttonsContainer) {
    return;
  }

  buttonsContainer.innerHTML = '';

  buttonList.forEach((button) => {
    const buttonHTML = document.createElement('button');
    buttonHTML.innerText = button.getLabel();
    buttonHTML.addEventListener('click', () => {
      button.click();
    });
    buttonsContainer.appendChild(buttonHTML);
  });
};

const commandManager = new CommandManager();
commandManager.register(CommandName.COPY, new CopyCommand());
commandManager.register(CommandName.CUT, new CutCommand());
commandManager.register(CommandName.PASTE, new PasteCommand());

const copyHandler = new UIEventHandler(commandManager, CommandName.COPY);
const cutHandler = new UIEventHandler(commandManager, CommandName.CUT);
const pasteHandler = new UIEventHandler(commandManager, CommandName.PASTE);

const buttonList: Button[] = [
  new Button('Copy', copyHandler),
  new Button('Cut', cutHandler),
  new Button('Paste', pasteHandler),
];

render(buttonList);
