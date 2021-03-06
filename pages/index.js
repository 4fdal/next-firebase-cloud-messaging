import Head from "next/head";
import Image from "next/image";
import React from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import styles from "../styles/Home.module.css";
import { async } from "@firebase/util";

export default class App extends React.Component {
  firebaseConfig = {
    apiKey: "AIzaSyDFfiYiF_xcndlGcimvENwNZS27XuFco84",
    authDomain: "minangphotograyapp.firebaseapp.com",
    projectId: "minangphotograyapp",
    storageBucket: "minangphotograyapp.appspot.com",
    messagingSenderId: "151977759964",
    appId: "1:151977759964:web:5a2a4455f49d9fd5fa9019",
    measurementId: "G-2M1SSNTTFV",
  };

  fcmConfig = {
    vapidKey:
      "BGkGvWzImHbn8b0-GOdocVVMLIIU1KspcqUYs5Nld40kVbKzIe7jsO-hRCOXjUvvfQ_0Ttg6XKlRsvzPzkp6tmM",
  };

  componentDidMount = () => {
    this.firebaseCloudMessageInit();
  };

  firebaseCloudMessageInit = async () => {
    // start request permission
    const permissionStatus = await Notification.requestPermission();
    if (permissionStatus && permissionStatus == "granted") {
      // init firebase
      const firebaseApp = initializeApp(this.firebaseConfig);

      // init messaging
      const messaging = getMessaging(firebaseApp);
      const token = await getToken(messaging, this.fcmConfig);

      // show token from console log
      console.log("Firebase Cloud Messaging Client Token : \n" + token);

      // start event on message
      onMessage(messaging, resultMessage => {
        // show data result message from console log
        console.log("Data message result \n", resultMessage);
      });
    }
  };

  render = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    );
  };
}
