<template>
  <main
    class="content container"
    v-if="productLoading"
  >
    Идёт загрузка товара...
  </main>
  <main
    class="content container"
    v-else-if="!productData"
  >
    Не удалось загрузить товар!
  </main>
  <main
    class="content container"
    v-else
  >
    <div class="content__top">
      <!-- "Хлебные крошки" - навигация в виде цепочки ссылок.
      При клике на Каталог и Категорию будем переходить на страницу
      со списком товаров (главную страницу) -->
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <!-- <router-link> — это компонент предназначенный для навигации пользователя в приложении
          с клиентской маршрутизацией. Путь назначения указывается входным параметром :to
          (то есть, при нажатии на элемент переходим по адресу, как по ссылке)
          Данные берём из файла "router/index.js" -->
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
            @click.prevent="gotoPage('main')"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image.file.url"
            :alt="product.title"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">
          Артикул: {{ product.id }}
        </span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart"
          />
          <b class="item__price">
            <!-- Используем фильтр (функцию) numberFormat для форматирования чисел
            по разрядам. Выражение слева (product.price) будет помещено в эту функцию
            в качестве первого аргумента -->
            {{ product.price | numberFormat }} ₽
          </b>

          <fieldset class="form__block">
            <legend class="form__legend">
              Цвет:
            </legend>
            <ColorsList
              :product-id="product.id"
              :colors="product.colors"
              :key="'colors#' + product.id"
              :element-name="'product_' + product.id"
              v-model="currentItemColor"
              :class-name="'colors'"
            />
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">
              Объем в ГБ:
            </legend>

            <ul class="sizes sizes--primery">
              <li class="sizes__item">
                <label class="sizes__label">
                  <input
                    class="sizes__radio sr-only"
                    type="radio"
                    name="sizes-item"
                    value="32"
                  >
                  <span class="sizes__value">
                    32gb
                  </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input
                    class="sizes__radio sr-only"
                    type="radio"
                    name="sizes-item"
                    value="64"
                  >
                  <span class="sizes__value">
                    64gb
                  </span>
                </label>
              </li>
              <li class="sizes__item">
                <label class="sizes__label">
                  <input
                    class="sizes__radio sr-only"
                    type="radio"
                    name="sizes-item"
                    value="128"
                    checked=""
                  >
                  <span class="sizes__value">
                    128gb
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <div class="item__row">
            <ProductCounter
              class="form__counter"
              v-model.number="productAmount"
              :min-value="1"
            />
            <button
              class="button button--primery"
              type="submit"
              :aria-disabled="productAddSending"
              @click.prevent="addToCart"
            >
              <span>
                В корзину
              </span>
            </button>
          </div>
          <div
            v-show="productAdded"
          >
            Товар добавлен в корзину
          </div>
          <div
            v-show="productAddSending"
          >
            Добавляем товар в корзину...
          </div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>
            Что это?
          </h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на
            мобильное устройство можно установить как фирменное приложение, так и различные
            приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
            принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть
            уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>
            Дизайн
          </h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен
            из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю
            56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ColorsList from '@/components/ColorsList.vue';
import ProductCounter from '@/components/ProductCounter.vue';
import { API_BASE_URL } from '../config';

export default {
  components: { ColorsList, ProductCounter },
  data() { // СОСТОЯНИЕ
    return {
      productAmount: 1, // Свойство для хранения количества товаров в Корзине
      productData: null, // Информация о товаре, возвращаемом из API
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false, // Информация о том, добавился ли продукт в Корзину
      productAddSending: false, // Информация о добавлении в Корзину (идёт запрос)
    };
  },
  filters: { // ФИЛЬТРЫ (Объект методов). Ключ - название фильтра, значение -
  // функция, которая совершает полезную работу.
    numberFormat, // здесь ключ и значение совпадают, используется сокращение
  },
  computed: {
    product() { // Информация о просматриваемом продукте
      return this.productData;
    },
    category() { // Информация о категории
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productAdded = false; // Товар ещё не добавился
      this.productAddSending = true; // Идёт отправка данных о добавлении в Корзину
      if (this.productAmount >= 1) {
        this.addProductToCart({
          productId: this.product.id,
          amount: this.productAmount,
          color: this.currentItemColor,
        })
          .then(() => {
            this.productAdded = true; // Товар добавился в Корзину
            this.productAddSending = false; // Отправка товара в Корзину завершена
          });
      }
    },
    loadProduct() { // Получение данных о товаре из API
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .then(
          () => (this.currentItemColor = this.$route.params.color || this.product.colors[0].code),
        )
        .catch(() => { this.productLoadingFailed = true })
        .then(() => { this.productLoading = false });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
