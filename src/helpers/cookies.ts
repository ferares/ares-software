function getCookie(name: string) {
  const cookieString = document.cookie
  const cookies = cookieString.split(" ")
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=")
    if (cookieName === name) return cookieValue
  }
  return null
}

function setCookie(name: string, value: string, daysToExpire = 30) {
  const date = new Date()
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value} ${expires} path=/`
}

export { getCookie, setCookie }