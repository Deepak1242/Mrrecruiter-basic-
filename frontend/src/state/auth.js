import { atom, useRecoilState, useRecoilValue, selector } from 'recoil'

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
    accessToken: null,
  },
  effects_UNSTABLE: [({ setSelf, onSet }) => {
    try {
      const saved = localStorage.getItem('authState')
      if (saved) {
        setSelf(JSON.parse(saved))
      }
    } catch (e) {
      console.error(e)
    }
    onSet((newVal, _oldVal, isReset) => {
      try {
        if (isReset) {
          localStorage.removeItem('authState')
        } else {
          localStorage.setItem('authState', JSON.stringify(newVal))
        }
      } catch (e) {
        console.error(e)
      }
    })
  }],


})  

export const isLoggedIn = selector({
  key : "isLoggedIn",
  get : ({get}) => get(authState).isAuthenticated,
})