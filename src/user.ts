export class user{

    private _id: number;
    private _login: string;
    private _passwd: string;


    constructor(id?:number, login?:string, password?:string){
        this._id = id;
        this._login = login;
        this._passwd = password;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get login(): string {
        return this._login;
    }
    public set login(value: string) {
        this._login = value;
    }
    public get passwd(): string {
        return this._passwd;
    }
    public set passwd(value: string) {
        this._passwd = value;
    }


}
