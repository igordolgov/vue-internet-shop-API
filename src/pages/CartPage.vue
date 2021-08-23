<template>
  <main
    v-if="products === 'error'"
    class="content container"
  >
    <h2>Возникла ошибка</h2>
  </main>
  <main
    v-else-if="products.length < 1"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      <h1 class="content__title">
        Корзина
      </h1>
    </div>
    <h2>Корзина пуста</h2>
  </main>
  <main
    v-else
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span
        class="content__info"
        v-show="products.length !== 0"
      >
        Товаров в корзине: {{ totalAmount }}
      </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="item in products"
              :key="item.productId"
              :item="item"
              :color="item.color"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ (totalPrice || 0) | numberFormat }} ₽</span>
          </p>

          <router-link
            class="cart__button button button--primery"
            :to="{ name: '' }"
            v-if="totalAmount"
            type="submit"
            tag="button"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartCountProducts',
    }),
    ...mapActions(['loadCart']),
  },
};
</script>
