import styles from "../styles/Home.module.css";
import Hero from "../sections/Hero";
import Prizes from "../sections/Prizes/index";
import Theme from "../sections/Theme/index";
import About from "../sections/About/index";
import Sponsors from "../sections/Sponsors";
import Schedule from "../sections/Schedule";
import Faqs from "../sections/Faqs";
import Team from "../sections/Team";

export async function getStaticProps() {
  const query = `{
    nameCollection{
      items{
        title
        description
        icon{
          description
          url
          width
          height
        }
      }
    }
    prizesCollection{
      items{
        title
        description
        icon{
          description
          url
          width
          height
        }
      }
    }
  faQsCollection{
    items{
      question
      answer
    }
  }
  }`;
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((res) => res.json());
  return {
    props: {
      content: response.data.nameCollection.items,
      prizes: response.data.prizesCollection.items,
      faqs: response.data.faQsCollection.items,
    },
  };
}

export default function Home({ content, prizes, faqs }) {
  return (
    <>
      <div className={styles.container}>
        <Hero></Hero>
        <About></About>
        <Prizes prizes={prizes}></Prizes>
        <Theme content={content}></Theme>
        <Schedule></Schedule>
        <Sponsors></Sponsors>
        <Faqs faqs={faqs}></Faqs>
        <Team></Team>
      </div>
    </>
  );
}
