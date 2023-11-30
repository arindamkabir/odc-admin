import Head from 'next/head'
import React from 'react'

type SEOProps = {
    title: string,
    description?: string
}

const SEO = ({ title, description }: SEOProps) => {
    return (
        <Head>
            <title>Keenbo Admin - {title}</title>
            <meta property="og:title" content={`Keenbo - ${title}`} key="title" />
        </Head>
    )
}

export default SEO