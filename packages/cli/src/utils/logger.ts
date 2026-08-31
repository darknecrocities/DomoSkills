import pc from 'picocolors';

export const logger = {
  banner: () => {
    console.log(
      pc.bold(
        pc.white(
          '\n  DOMOSKILLS_ ' + pc.dim('v0.1.0') + ' — The Open Agent Skills Registry\n'
        )
      )
    );
  },
  info: (msg: string) => console.log(pc.cyan('[info] ') + msg),
  success: (msg: string) => console.log(pc.green('[ok] ') + pc.bold(msg)),
  warn: (msg: string) => console.log(pc.yellow('[warn] ') + pc.yellow(msg)),
  error: (msg: string) => console.error(pc.red('[err] ') + pc.red(pc.bold(msg))),
  step: (step: string, desc: string) =>
    console.log(`  ${pc.dim('>')} ${pc.bold(step)}: ${pc.dim(desc)}`),
  log: (msg = '') => console.log(msg),
};
