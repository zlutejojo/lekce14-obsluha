const API_NAME = 'janciz';
const API_BASE = `https://czechitas.twoways.cz/api/${API_NAME}`;

export default class DataStore {

  constructor() {
    this.orders = [];
  }

  async getOrders() {
    try {

    let response = await fetch(`${API_BASE}/orders`);
    let data = await response.json();
    this.orders = data;

    } catch {
      console.error('nepodarilo se nacist');
    }
  }


  getOrderById(id) {

    //tady potrebujeme, aby se neporovnavly typy, takze budou 2 rovna se
    return this.orders.fing(order => order.id == id);
  }

  async updateOrder(id){
    let order = this.getOrderById(id);
    const data = {
      //toto menime z nula na 1 (O je napr zadana objednavka, 1 je odbavena)
      status: 1,
      position: order.position,
      products: []
    };

    //tady se nam to nevraci v tom tvaru v jakem to budeme posilat na server
    order.products.forEach(product => {
    
      data.products.push({
        product_id: product.id, 
        amount: product.pivot.amount;
      });
    });

    await fetch(`${API_BASE}/orders`, {
      headers: {
        //ceka JSon a budu posilat json
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'

      },
      method: 'POST',
      //tady muzu poslat jenom text
      body: JSON.stringify(data)
    });

    //pak jeste musim mit fetch s PATCH
  
  }

}
