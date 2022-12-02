import Head from 'next/head'
import React from 'react'

export interface ISEO {
    title?: string
    description?: string
    keywords?: string
    image?: string
    author?: string
    noIndex?: boolean
}
class SEO extends React.Component<ISEO> {
    static defaultProps: ISEO
    render() {
        const { title, description, keywords, author, image, noIndex } = this.props
        return (
            <Head>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <title>{`${title} | ${keywords}`}</title>
                <link rel='icon' href='/images/favicon.ico' sizes='any' type='image/ico+xml' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                {noIndex && <meta name='googlebot' content='noindex' />}
                <meta property='og:locale' content='id' />
                <meta property='og:site_name' content={title} />
                <meta property='og:type' content='website' />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image' content={image} />

                <meta name='twitter:card' content='summary' />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:creator' content={author} />
                <meta name='twitter:image' content={image}></meta>
            </Head>
        )
    }
}

SEO.defaultProps = {
    title: 'Fairatmos',
    description: `Everyone has a fair chance to save our atmosphere`,
    keywords: 'Fairatmos',
    image: '/fairatmos-logo',
    author: 'Claudia Felicia'
}

export default SEO