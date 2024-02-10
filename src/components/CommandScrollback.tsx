import { Component, For, Show } from 'solid-js';
import { Command } from '../commands';
import TextOutput from './TextOutput';
import Prompt from './Prompt';

export const Link: Component = () => {
  return <a href="https://github.com/AshishKatale">
    https://github.com/AshishKatale
  </a>;
};

export const Test: Component = () => {
  return 'Render this Component';
};

const CommandScrollback: Component<{ commands: Command[] }> = (props) => {
  return <For each={props.commands}>{
    c => <div>
      <Prompt>{c.cmd}</Prompt>
      <Show when={c.output != undefined}>
        <div class="panel">
          <Show when={Array.isArray(c.output)}>
            <TextOutput lines={c.output as string[]} />
          </Show>
          <Show when={!Array.isArray(c.output)}>
            {c.output}
          </Show>
        </div >
      </Show>
    </div>
  }
  </For>;
};

export default CommandScrollback;
