export class Clamp {
    private _clamp: number = 0;

    public get clamp(): number {
        return this._clamp;
    }

    public set clamp(clamp) {
        this._clamp = clamp % 1;
    }

    public add(value: number) {
        this._clamp = (this._clamp + value) % 1;
    }
}