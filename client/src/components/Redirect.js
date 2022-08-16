import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import React from 'react'
import NotFound from './NotFound';




const Redirect = () => {
  const { urlCode } = useParams();

  const GET_URL = gql`
    query getUrl($urlCode: String!) {
        url(urlCode: $urlCode) {
          urlCode
          longUrl
          shortUrl
        }
      }
  `

  const { loading, error, data } = useQuery(GET_URL, 
    { variables: { urlCode } });

  if (loading) return <CircleLoader loading={true} color={"a1a1a1"}/>

  if (!loading && !error && data.url) {
    window.location.replace(data.url.longUrl)
    return <CircleLoader loading={true} color={"a1a1a1"}/>
  }
  
  return (
    <NotFound />
  )
}

export default Redirect