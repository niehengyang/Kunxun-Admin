const getters = {

  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routes,
  website: state => state.common.website,

};
export default getters
