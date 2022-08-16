import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import CopyToClipboard from 'react-copy-to-clipboard';
import CircleLoader from 'react-spinners/CircleLoader'


const Result = ({ longUrl }) => {
  const [shortLink, setShortLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [copied])
  
  
  
  const ADD_URL = gql`
    mutation addUrl($longUrl: String!) {
      addUrl(longUrl: $longUrl) {
        urlCode
        longUrl
        shortUrl
      }
    }
  `

  const [addUrl, { data, loading, error }] = useMutation(ADD_URL, {
    variables: {
      longUrl
    }
  })

  // When long url is updated, trigger mutation
  useEffect(() => {
    const fetchData = async () => {
      if (longUrl.length) {
        addUrl(longUrl)
      }
    }
    
    fetchData()
  
  }, [longUrl])

  useEffect(() => {
    if (data) {
      setShortLink(data.addUrl.shortUrl)
    }
  }, [data])
 
  

  if (loading) return <CircleLoader loading={loading}/>

  if (error) {
    return (
    <div className='result'>
      <p>Invalid link. Please provide a valid URL</p>
    </div>
    )
  }
  
  if (!shortLink.length) return <div></div>

  return (
    <div className='result'>
      <p>{shortLink}</p>
      <CopyToClipboard 
        text={shortLink}
        onCopy={() => setCopied(true)}  
      >
        <button className={copied ? "copied" : ""}>Copy to clipboard</button>
      </CopyToClipboard>
      
    </div>
  )
}

export default Result