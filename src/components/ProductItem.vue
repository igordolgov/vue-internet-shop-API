<template>
  <!-- Шаблон компонента (отдельно от JavaScript) -->
  <li class="catalog__item">
    <!-- <router-link> — компонент предназначенный для навигации пользователя в приложении
    с клиентской маршрутизацией. Путь назначения указывается входным параметром to -->
    <router-link
      class="catalog__pic"
      :to="{name: 'product', params: {id: product.id}}"
    >
      <!-- подключаем картинку товара и с помощью директивы
      v-bind (сокращённо :) связываем её src и alt с товаром -->
      <img
        :src="product.image"
        :alt="product.title"
      >
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }} <!-- С помощью интерполяции выводим название товара -->
      </a>
    </h3>

    <span class="catalog__price">
      <!-- С помощью интерполяции выводим цену товара. Используем фильтр (функцию)
      numberFormat для форматирования чисел по разрядам. Выражение слева (product.price)
      будет помещено в эту функцию в качестве первого аргумента -->
      {{ product.price | numberFormat }} &#8381;
    </span>

    <ColorsList
      class="colors--black"
      :colors="colors"
      :current-color="firstColor"
    />
  </li>
</template>

<script>
import ColorsList from '@/components/ColorsList.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: {
    ColorsList,
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  filters: { // ФИЛЬТРЫ (Объект методов). Ключ - название фильтра, значение -
  // функция, которая совершает полезную работу
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors;
    },
    firstColor() {
      return this.colors[0].id;
    },
  },
  methods: {
    gotoPage,
  },
};
</script>
