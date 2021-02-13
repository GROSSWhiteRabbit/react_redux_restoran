
export default class RestoService {
    // baseUrl= 'http://localhost:3000';
    baseUrl= process.env.PUBLIC_URL +'/db.json';

    async getMenuItem(){
        // return await  this._getData(this.baseUrl + '/menu');
        return await this._getData(this.baseUrl).then(res=>res.menu);

    }
    async postOrderFromCart(data){
        return await  this._postData(this.baseUrl + '/order', data); 
    }

    async _getData(url){
        const res = await fetch(url);
        if(!res.ok) {
            console.error(`could not feth ${url}, status:${res.status}`)
        }

        return await res.json();
    }

    async _postData(url, data){
        const res = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!res.ok) {
            console.error(`could not feth ${url}, status:${res.status}`)
        }

        return await res.json();
    }
}