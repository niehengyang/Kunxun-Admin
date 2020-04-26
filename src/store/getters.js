const getters = {

  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  permission_routers: state => state.permission.menus,

};
export default getters
