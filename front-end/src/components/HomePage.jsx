import React from 'react';
import Feedback from './feedback/Feedback';
import PageBase from "./PageBase"

export default function HomePage() {
  return (
    <>
      <PageBase >
        <Feedback />
      </PageBase>
    </>
  )
}