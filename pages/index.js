import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function Home() {

  const router = useRouter()
  const [gettingUserJWTToken, setGettingUserJWTToken] = useState("")

  useEffect(() => {
    setGettingUserJWTToken(localStorage.getItem('userJWTToken'))
    if (localStorage.getItem('userJWTToken') === '') {
      router.push('/login')
    }
  })

  async function logoutUser() {
    setGettingUserJWTToken(localStorage.setItem('userJWTToken', ''));
  }

  return (
    <div className={styles.center}>
      <div className={styles.centerData}>
        <h1>Hello Admin,</h1>
        <h3>What you want to add</h3>
        {gettingUserJWTToken === '' ?
          <>
            <Link href='/login' class="btn btn-primary btn-lg mt-3" role="button">Login</Link><br />
          </>
          :
          <>
            <Link href='/addQues' class="btn btn-primary btn-lg mt-3" role="button">Question</Link><br />
            <Link href='/addClass' class="btn btn-primary btn-lg mt-3" role="button">Classes</Link><br />
            <button class="btn btn-primary btn-lg mt-3" onClick={() => logoutUser()}>Logout</button><br />
          </>
        }
      </div>
    </div>
  );
}

export default Home;
