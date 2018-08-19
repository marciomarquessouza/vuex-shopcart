<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <p><b>Item: </b>{{ product.title }} - <b>Price: </b> {{ product.price | currency }}
          - <b>Quantity: </b> {{ product.quantity }} <b>Item total: </b>{{ product.total | currency }}</p>
      </li>
    </ul>
    <h4>Cart Total: {{ total | currency }}</h4>
    <button @click="checkout()">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>

export default {
  methods: {
    checkout() {
      this.$store.dispatch('checkout');
    },
  },
  computed: {
    products() {
      return  this.$store.getters.cartProducts;
    },
    total() {
      return  this.$store.getters.cartTotal;
    },
  },
};

</script>
