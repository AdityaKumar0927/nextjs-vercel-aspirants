// src/pages/index.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';
import MainContent from './components/MainContent';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Home Page</title>
      </Head>
      <MainContent />
    </Fragment>
  );
};

export default HomePage;
