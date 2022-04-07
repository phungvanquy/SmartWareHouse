import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, DELETE, UPDATE } from "../constants/actionTypes";

// Action Creators - Redux thunk
export const getProducts = (setState, warehouseId) => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts(warehouseId);
    dispatch({ type: FETCH_ALL, payload: data });

    setState((prevState) => {
      return { ...prevState, isLoading: false };
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(product);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
