import React, { Fragment } from 'react'
import { NextPage, GetStaticProps } from 'next'
import 'data/adapters'
import sdk from 'data/sdk'
import List from 'components/List'

interface HomeProps {
  data: any[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <Fragment>
      <main>
        <h1 className="title">Open-Orgs.info</h1>

        <p className="description">
          DAOs are the new companies.<br />
          What's on their balance sheets?
        </p>

        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-show-count="true"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <List data={data} />
      </main>

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const list = sdk.getList('treasuries')

  const data = await list.executeQueriesWithMetadata(['currentTreasuryUSD'])

  return { props: { data }, revalidate: 60 };
};


export default Home;
