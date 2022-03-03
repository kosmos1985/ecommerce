export class User {
    constructor(
        public email: string,
        public id: string,
        private _tocken: string,
        private _tockenExpirationDate: Date
    ){}

    get tocken(){
        if(!this._tockenExpirationDate || new Date() > this._tockenExpirationDate){
            return null;
        }
        return this._tocken;
    }
}