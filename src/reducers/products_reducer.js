import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
      break;

    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
      break;

    case GET_PRODUCTS_BEGIN:
      return { ...state, product_loading: true };
      break;

    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        product_loading: false,
        featured_products,
        products: action.payload,
      };

    case GET_PRODUCTS_ERROR:
      return { ...state, product_loading: false, product_error: true };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
