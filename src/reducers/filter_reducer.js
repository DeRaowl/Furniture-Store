import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
      break;
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
      break;
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
      break;

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
      break;
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
      break;

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
      break;
    case FILTER_PRODUCTS:
      return { ...state };
      break;

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
      break;
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
