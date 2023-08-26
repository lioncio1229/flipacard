export type ModeProps = {
  name: string;
  rows: number;
  cols: number;
  duration: number;
};

interface AppConfig {
  modes: ModeProps[];
  gameCardFlipspeed: number;
  closeCardDuration: number;
  bothCardCloseDuration: number;
  showcards: boolean;
}

declare module "config.json" {
  const value: AppConfig;
  export default value;
}
