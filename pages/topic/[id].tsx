import styles from "./topic.module.css";
import { getReplies, getTopicInfo } from "../../lib/v2exApi";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import Link from "next/link";
interface htmlContent {
  __html: string;
}
function createHtml(str: string): htmlContent {
  return { __html: str };
}
function Page({ data, topic }) {
  // Render data...
  return (
    <div>
      <header className={styles.siteHeader}>
        <a href="/" title="V2EX">
          <div className={styles.logoMobile}></div>
        </a>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.box}>
            <div className={styles.cell}>
              <div className={styles.headerWrapper}>
                <Link href="/">
                  <div className={styles.link}>{"V2EX"}</div>
                </Link>
                <div className={styles.header}>
                  <h2>{topic?.title}</h2>
                </div>
                <div style={{ color: "var(--color-gray);" }}>
                  {" "}
                  {`BY ${topic.member.username}`}
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={createHtml(topic?.content_rendered)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.box}>
            {data.map((val, index) => {
              return (
                <div className={styles.cell} key={index}>
                  <div className={styles.reply}>
                    <img
                      className={styles.avatar}
                      src={val.member.avatar_normal}
                    ></img>
                    <div className={styles.username}>{val.member.username}</div>
                    <div className={styles.index}>{index + 1}</div>
                  </div>
                  <div className={styles.content}>{val.content}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const data = await getReplies(context.params.id);
  const topicInfo = await getTopicInfo(context.params.id);
  // Pass data to the page via props
  return { props: { data: data, topic: topicInfo[0] } };
}

export default Page;
