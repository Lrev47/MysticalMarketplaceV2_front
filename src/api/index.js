import * as authAPI from './authAPI';
import * as userAPI from './userAPI';
import * as productAPI from './productAPI';
import * as categoryAPI from './categoryAPI';
import * as orderAPI from './orderAPI';
import * as orderItemAPI from './orderItemAPI';
import * as addressAPI from './addressAPI';

export {
  authAPI,
  userAPI,
  productAPI,
  categoryAPI,
  orderAPI,
  orderItemAPI,
  addressAPI,
};

export default {
  auth: authAPI,
  user: userAPI,
  product: productAPI,
  category: categoryAPI,
  order: orderAPI,
  orderItem: orderItemAPI,
  address: addressAPI,
}; 