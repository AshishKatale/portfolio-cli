import { Component } from 'solid-js';
import { JSX } from 'solid-js/h/jsx-runtime';

const Prompt: Component<{ children: JSX.Element; }> = (props) => {
  const prompt = 'ashish@portfolio';
  return <>
    <span class="uname">{prompt}&nbsp;</span>
    <span class="dollar">$&nbsp;</span>
    {props.children}
  </>;
};

export default Prompt;
