import AV from 'leancloud-storage'

//  在线存储
var APP_ID = 'EckJaPUPPEdW19WxjJQa2EFe-gzGzoHsz'
var APP_KEY = 'dtilTjwfUeEYq14HThDuu9nI'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


export function signUp (email, username, password, successFn, errorFn) {

  var user = new AV.User()

  user.setUsername(username)

  user.setPassword(password)

  user.setEmail(email)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined
}

export function signIn (username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}
export function signOut () {
  AV.User.logOut()
  return undefined
}
export function sendPasswordResetEmail (email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}
export function getCurrentUser () {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}
function getUserFromAVUser (AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

