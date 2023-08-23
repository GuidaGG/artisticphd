export const state = () => ({
    layout: 'en',
    menus: ['program', 'candidates', 'Events', 'Seminars', 'Contact'],
    submenusEn: ['about', 'admissions', 'structure', 'how to finance', 'partners', 'supervisors' ],
    submenusDe: ['über', 'admissions', 'struktur', 'Externe Finanzhilfen', 'partner', 'betreuer' ],
    submenus: ['about', 'admissions', 'structure', 'how to finance', 'partners', 'supervisors' ],
    cookies: []
  })
     
 export const mutations = {
   CHANGE_NAV_LAYOUT(state, layout) {
     state.layout = layout;
    
   },
   CHANGE_NAV_TITLES(state, menus) {
    state.menus = menus;
   },
   CHANGE_SUBNAV_TITLES(state, submenus) {
    state.submenus = submenus;
   },
   CHANGE_DE_TITLES(state) {
    state.submenus = state.submenusDe;
   },
   CHANGE_EN_TITLES(state) {
    state.submenus = state.submenusEn;
   },
   ADD(state, slug) {
    state.cookies.push({
      slug
    })
    },
    remove(state, slug) {
      state.cookies.splice(state.cookies.indexOf(slug), 1)
    },

 }