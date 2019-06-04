import DataStore from "./DataStore";
import Orders from "./Orders";

(() => {

  const dataStore = new DataStore();
  const orders = new Orders(dataStore);


})();

