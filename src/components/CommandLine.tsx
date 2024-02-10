import { JSX } from 'solid-js/h/jsx-runtime';
import { getSuggestion } from '../commands';
import { Component, createSignal } from 'solid-js';
import Prompt from './Prompt';

type Props = {
  ref: HTMLInputElement | undefined,
  submitCommand: (command: string) => void
};

const CommandLine: Component<Props> = (props) => {
  const [input, setInput] = createSignal('');
  const [inputSuggestion, setInputSuggestion] = createSignal('');

  const onKeyHandler: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = (e) => {
    if (e.key === 'Tab' || (e.ctrlKey && e.key === 'y')) {
      e.preventDefault();
      setInput(getSuggestion(input()) || input() || 'help');
      setInputSuggestion('');
    }
  };

  const onInputHandler: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    const cmd = e.currentTarget.value.trim();
    const suggestion = getSuggestion(cmd);
    setInputSuggestion(suggestion);
    setInput(cmd);
  };

  const onSubmitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    props.submitCommand(input());
    setInput('');
    setInputSuggestion('');
  };

  return <div class="commandline">
    <Prompt>
      <span id="cmd">
        <form id="command" onSubmit={onSubmitHandler}>
          <input
            ref={props.ref}
            type="text"
            id="readline"
            value={input()}
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck={false}
            onInput={onInputHandler}
            onKeyDown={onKeyHandler}
          />
        </form>
        <span id="command-suggest">{inputSuggestion()}</span>
      </span>
    </Prompt>
  </div>;
};

export default CommandLine;
