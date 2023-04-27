import React from 'react'
import Layout from '../components/Layout'

const LoadingPage = () => {
  return (
    <Layout>
        <div className="w-full flex justify-center">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    </Layout>
  )
}

export default LoadingPage