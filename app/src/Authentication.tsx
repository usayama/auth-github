import React, { Dispatch } from 'react'
import firebase, { auth } from './firebase'

type AuthenticationProps = {
  user: firebase.User | null
  setUser: Dispatch<firebase.User | null>
}

const Authentication: React.FC<AuthenticationProps> = ({ user, setUser }) => {
  async function callbackSignIn(provider: firebase.auth.AuthProvider) {
    if (user) {
      return
    }
    await auth.signInWithPopup(provider).catch(error => {
      console.log(error.log)
      console.log(error.message)
    })
  }

  async function githubSignIn() {
    const provider = new firebase.auth.GithubAuthProvider()
    await callbackSignIn(provider)
  }

  async function signOut() {
    await auth.signOut().catch(error => {
      console.log(error.log)
      console.log(error.message)
    })
    setUser(null)
  }

  if (!user) {
    return (
      <section>
        <div>
          <button onClick={githubSignIn}>githubでログイン</button>
        </div>
      </section>
    )
  } else {
    return (
      <section>
        <div>
          <button onClick={signOut}>ログアウト</button>
        </div>
      </section>
    )
  }
}

export default Authentication
