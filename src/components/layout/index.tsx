import React from 'react'
import SEO, { ISEO } from '../seo'

interface IProps {
    seo?: ISEO
    children: React.ReactNode
}

const LayoutComponent = (props: IProps) => {
    const { seo, children } = props
    return (
        <>
            <SEO {...seo} />
            {children}
        </>
    )
}

export default LayoutComponent