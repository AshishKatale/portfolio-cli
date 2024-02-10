import { Component, For } from 'solid-js';

const TextOutput: Component<{ lines: string[] }> = (props) => {
  return <For each={props.lines}>{
    (line) => {
      return <p>
        {line}
      </p>;
    }
  }
  </For>;
};

export default TextOutput;
