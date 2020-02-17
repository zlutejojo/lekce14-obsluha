export default class Orders {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  renderHTML() {
    let html = '';

    this.dataStore.orders.forEach(order => {
      console.log(order);

      //pres new Date muzu vytvorit i datum a to mame v tom api - new Date(order.created_at);
      // jak zjistim aktualni cas: Date.now() - to je objekt, ktery obsahuje to co potrebuji,
      //kdyz odectu dva datumy, tak dostanu zpet milisekundy

      let datumObjednavky = new Date(order.created_at);
      
      // 120 odečítám protože server je v londýně a tohle je časový posun
      let cekani = Math.round((Date.now() - datumObjednavky) / 1000 / 60 - 120) ;

      // misto toho ok muzu mit ok, critical a slow - to mi pak změni barvy objednavek
      // tady mam 2 ternarni operatory v sobe  
      html += `<div data-id="${order.id}" class="order order--${cekani > 40 ? 'critical' : cekani > 20 ? 'slow ' : 'ok' }">
      <div class="order__header">
        <h2 class="order__table">Stůl č. ${order.position}</h2>
        <div class="order__time">${cekani} min</div>
      </div>
      <ul class="order__items">`;

        //<li class="order__item">2× Cappucino</li>
        //<li class="order__item">1× Espresso</li>
        //<li class="order__item">3× Jahodový eclair</li>

        order.products.forEach(product => {
          html += `<li class="order__item">${product.pivot.amount}× ${product.name}</li>`
        });
      
      
        html += `</ul>
      <button class="button button--full">ODBAVIT</button>
    </div>`;
      
    });

    if (html !== '') {
      document.querySelector('#orders').innerHTML = html;
      const buttons = document.querySelectorAll('.button');
      for(let button of buttons) {
        button.addEventListener('click', (e) => {
          let id = e.target.closest('[data-id]').dataset.id;
          this.dataStore.updateOrder(id).then(() => console.log('updated'))
        })
      }

    }

  }


}

