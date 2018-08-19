import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  // similar to data()
  state: {
    products: [],
    cart: [],
    checkoutStatus: null,
  },
  // similar to computed
  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
          total: product.price * cartItem.quantity,
        };
      })
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.total, 0);
    },
  },
  // similar to methods
  actions: {
    fetchProducts({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        });
      });
    },
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id);
        if(!cartItem) {
          context.commit('pushProductToCart', product.id);
        } else {
          context.commit('incrementItemQuantity', cartItem);
        }
        context.commit('decrementProductInventory', product);
      }
    },
    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus','success');
        },
        () => {
          commit('setCheckoutStatus','fail');
        },
      )
    },
  },
  // only update states by mutations
  mutations: {
    setProducts(state, products) {
       state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,

      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state, status) {
      state.cart = [];
    }
  },
})
