<template>
  <div>
    <h1>Product List</h1>
    <div  v-if="loading">
        <img src="https://cdn.dribbble.com/users/285475/screenshots/1418440/twisted.gif" height="400px" width="400px">
        <p>Loading</p>
    </div>
    <div v-else>
      <ul >
        <li v-for="product in products"
            :key="product.id">
            <h3>{{ product.title }}</h3>
            <p><b>Price: </b> {{ product.price | currency }} <b>Inventory: </b> {{ product.inventory }}</p>
            <button @click="addProductToCart(product)">Add Product to Cart</button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return{
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch('fetchProducts')
      .then(() => this.loading = false);
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product);
    },
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },
};

</script>
