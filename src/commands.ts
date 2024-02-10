import { Component } from 'solid-js';

export type Command = {
  cmd: string,
  output?: string[] | Component,
  fn?: () => string[] | void
}

export const availableCommands: Command[] = [
  {
    cmd: 'clear',
  },
  {
    cmd: 'c',
  },
  {
    cmd: 'help',
    output: [
      'whoami  ->  print name'.replaceAll(' ', '\u00A0'),
      'clear   ->  clear terminal'.replaceAll(' ', '\u00A0'),
      'relaod  ->  reload window'.replaceAll(' ', '\u00A0'),
      'theme   ->  change colorscheme'.replaceAll(' ', '\u00A0'),
      'github  ->  open github account'.replaceAll(' ', '\u00A0'),
      'help    ->  show this help info'.replaceAll(' ', '\u00A0'),
    ]
  },
  {
    cmd: 'whoami',
    output: ['Ashish Katale']
  },
  {
    cmd: 'reload',
    fn: () => {
      window.location.reload();
    }
  },
  {
    cmd: 'theme',
    output: [],
    fn: () => {
      const theme =
        document.documentElement.dataset['theme'] == 'dark'
          ? 'light'
          : 'dark';
      document.documentElement.dataset['theme'] = theme;
      return [`colorscheme is set to ${theme}`];
    }
  },
  {
    cmd: 'github',
    fn: () => {
      window.open('https://github.com/AshishKatale', '_blank');
    }
  }
];

export function getSuggestion(input: string): string {
  let suggestion = '';
  const cmd = input.trimStart();
  if (cmd.length) {
    suggestion = availableCommands
      .find(c => c.cmd.startsWith(cmd))
      ?.cmd ?? '';
  }
  return suggestion;
}
