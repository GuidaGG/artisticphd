export const state = () => ({
    layout: 'eng',
    menus: ['program', 'candidates', 'news', 'contact']
 })

 export const mutations = {
   CHANGE_NAV_LAYOUT(state, layout) {
     state.layout = layout;

   },
   CHANGE_NAV_TITLES(state, menus) {
    state.menus = menus;
   }
 }
