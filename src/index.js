import DataStore from "./DataStore";
import Orders from "./Orders";

(() => {

  const dataStore = new DataStore();
  const orders = new Orders(dataStore);

  //potrebujem, aby se aktualizovaly objednavky real-time, tak se musime porad dokola dotazovat
  setInterval(() => {

    dataStore.getOrders()
    .then(() => {
      orders.renderHTML();
    })
  }, 5000)
 


})();

