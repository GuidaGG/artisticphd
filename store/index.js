export const state = () => ({
    layout: 'en',
    menus: ['program', 'candidates', 'Events', 'Seminars', 'Contact'],
    submenusEn: ['about', 'admissions', 'structure', 'how to finance', 'partners' ],
    submenusDe: ['about', 'admissions', 'structure', 'how to finance', 'scholarships', 'partners' ],
    submenus: ['about', 'admissions', 'structure', 'how to finance', 'scholarships', 'partners' ],
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
   CHANGE_DE_TITLES(state, submenusDe) {
    state.submenusDe = submenusDe;
   },
   CHANGE_EN_TITLES(state, submenusEn) {
    state.submenusEn = submenusEn;
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