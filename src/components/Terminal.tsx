import { Component, createSignal, onMount } from 'solid-js';
import { Command, availableCommands } from '../commands';
import CommandScrollback from './CommandScrollback';
import CommandLine from './CommandLine';

const Terminal: Component = () => {
  const [commands, setCommands] = createSignal<Command[]>([]);
  let cmdInput: HTMLInputElement | undefined;
  let scroller: HTMLDivElement | undefined;
  let terminal: HTMLDivElement | undefined;

  onMount(() => {
    const cmdinfo = availableCommands.find((c => c.cmd === 'help'))!;
    setCommands([cmdinfo]);
    cmdInput?.focus();
  });

  const submitCommand = (command: string) => {
    const cmdinfo = availableCommands.find((c => c.cmd === command.trim()));
    if (command.trim().length === 0) {
      setCommands([...commands(), {
        cmd: command,
      }]);
    } else if (['clear', 'c'].includes(command)) {
      setCommands([]);
    } else if (!cmdinfo) {
      setCommands([...commands(), {
        cmd: command,
        output: [`command not found: ${command}`]
      }]);
    } else {
      const result = cmdinfo['fn']?.call(null);
      cmdinfo.output = result ?? cmdinfo.output;
      setCommands([...commands(), cmdinfo]);
    }
    if ((terminal?.scrollHeight ?? 0) > (terminal?.clientHeight ?? 0))
      scroller?.scrollIntoView();
  };

  return <div id="terminal" ref={terminal} onClick={() => cmdInput?.focus()}>
    <CommandScrollback commands={commands()} />
    <CommandLine
      ref={cmdInput}
      submitCommand={submitCommand}
    />
    <div id="scroller" ref={scroller} />
  </div>;
};

export default Terminal;
