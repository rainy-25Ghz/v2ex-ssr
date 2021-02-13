import Head from "../components/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { getHotTabContents } from "../lib/v2exApi";
import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loading } from "../components/loading/loading";
const tabNames = ["Python", "iDev", "Android", "Linux", "Apple", "nodejs"];

const TabsBar = () => {
  const router = useRouter();
  const [state, setState] = useState(Array(7).fill(false).fill(true, 0, 1));
  useEffect(() => {
    console.log(router.query);
  }, [router.query]);
  useEffect(() => {
    router.push(`/?tab=${tabNames[0]}`, undefined, { shallow: true });
  }, []);
  function handleClick(index: number) {
    let arr: Array<boolean> = Array(7).fill(false);
    arr[index] = true;
    setState(arr);
    router.push(`/?tab=${tabNames[index]}`, undefined, { shallow: true });
  }

  return (
    <div className={styles.cell}>
      {tabNames.map((value: string, index: number) => {
        return (
          <a
            key={index}
            onClick={() => handleClick(index)}
            className={state[index] ? "tab_current" : "tab"}
          >
            {value}
          </a>
        );
      })}
    </div>
  );
};
const Content = () => {
  const [topics, setTopics] = useState(undefined);
  const [fetchState, setFetchState] = useState({ end: false });
  const router = useRouter();
  useEffect(() => {
    setFetchState({ end: false });
    fetch(`/api/${router.query.tab}`)
      .then((res) => res.json())
      .then((json) =>
        json.map((val) => ({
          username: val.member.username,
          avatar: val.member.avatar_normal,
          title: val.title,
          replies: val.replies,
          id: val.id,
          content: val.content,
        }))
      )
      .then((topics) => {
        setTopics(topics);
        setFetchState({ end: true });
      });
  }, [router.query.tab]);
  return (
    <div className="cell">
      {fetchState.end ? (
        topics?.map((val, index) => {
          return (
            <div key={index} className="cell-item">
              <div className={styles.line1}>
                <img className="avatar" src={val.avatar} />
                <div className="title-wrapper">
                  <Link href={`/topic/${val.id}`}>
                    <a className="title">{val.title}</a>
                  </Link>

                  <div className="footer">{val.username}</div>
                </div>
                <span className="replies">{" " + val.replies}</span>
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};
const home = (props) => (
  <div>
    <Head title="Home" />
    <header className={styles.siteHeader}>
      <a href="/" title="V2EX">
        <div className={styles.logoMobile}></div>
      </a>
    </header>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.box}>
          <TabsBar />
          <Content />
        </div>
      </div>
    </div>

    <div>
      {/* {props.res.map((val) => {
        return (
          <div key={val.id} className={styles.center}>
            <img src={val.member.avatar_normal} />
            <p>{val.title}</p>
          </div>
        );
      })} */}
      {/* {JSON.stringify(props.res)} */}
    </div>
  </div>
);
export default home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getHotTabContents();
  return {
    props: {
      res: res,
    },
  };
  // ...
};
