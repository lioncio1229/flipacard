
export type ModeProps = {
    name: string,
    rows: number,
    cols: number,
}

interface AppConfig {
    modes: ModeProps[],
    gameCardFlipspeed: number,
    showcards: boolean,
}

declare module 'config.json' {
    const value: AppConfig;
    export default value;
}