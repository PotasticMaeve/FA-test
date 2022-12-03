import { Button, Card, Col, Typography, Input, Image, Tooltip } from 'antd'
import { useState } from 'react';
import Layout from '../src/components/layout'
import _ from 'lodash'
import { GetServerSideProps } from 'next';
import axios from 'axios'

const { Text, Paragraph } = Typography

export default function Project(props) {
  const { projectList, categoryList } = props
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [index, setIndex] = useState(undefined)
  const [categoryIndex, setCategoryIndex] = useState(undefined)
  const [isReverseSort, setIsReverseSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const handleChangeSearch = (key) => {
    setKeyword(key)
    if (key !== "") {
      const data = projectList.filter(x => x.category === categoryIndex).filter((el) => {
        if (el.title.toLowerCase().includes(key.toLowerCase())) {
          return el
        }
      })
      setSearchResult(data)
    }
  }

  const displayCardByCategory = (id) => {
    const data = categoryIndex === id && keyword ? searchResult : projectList.filter(x => x.category === id)
    return (
      <ul className="panel-items">
        {!data.length ? (
          <div className='centerize empty-state'>
            <Image
              alt='data-not-found'
              src='/images/not-found.png'
              height={80}
              width={80}
              preview={false}
            />
            <Text>Data Not Found</Text>
            <Text>Try another category</Text>
          </div>
        ) : (
          <>
            {(_.orderBy(data, ['carbon_number'], [categoryIndex === id && isReverseSort ? 'desc' : 'asc']).map((el, i) => (
              <li key={i}>
                <Col className='badge-carbon centerize'>
                  <i className="ri-virus-fill" />
                  <Text>{el.carbon_number} carbon</Text>
                </Col>
                <Card
                  cover={
                    <Image
                      alt={el.title}
                      src={el.image_url}
                      height='100%'
                      width='100%'
                      preview={false}
                    />
                  }
                >
                  <Text className='label-partner'>{el.partner}</Text>
                  <Text className="card-title">{el.title}</Text>
                  <Col span={24}>
                    {index === el.id ? (
                      <Paragraph
                        className='card-desc'
                      >
                        {el.overview}
                      </Paragraph>
                    ) : (
                      <Paragraph
                        ellipsis={{
                          rows: index === el.id ? undefined : 3,
                          expandable: index === el.id,
                          symbol: <></>,
                          onEllipsis: (ell) => setIsEllipsis(ell)
                        }}
                        className='card-desc'
                      >
                        {el.overview}
                      </Paragraph>
                    )}
                  </Col>
                  {isEllipsis ? (
                    <Button
                      type='text'
                      className='card-btn'
                      size='small'
                      onClick={() => index === el.id ? setIndex(undefined) : setIndex(el.id)}
                    >
                      {index === el.id ? 'Hide' : 'Read More'}
                    </Button>
                  ) : (
                    <></>
                  )}
                </Card>
              </li>
            )))}
          </>
        )
        }
      </ul >
    )
  }

  const handleSort = (id) => {
    setCategoryIndex(id)
    setIsReverseSort(!isReverseSort)
  }

  const handleSearch = (id) => {
    setShowSearch(false)
    setSearchResult([])
    setKeyword("")
    setCategoryIndex(id)
    setShowSearch(!showSearch)
  }

  return (
    <Layout seo={{ title: 'Projects' }}>
      <Col className="panel-container">
        {categoryList?.map((el, i) => (
          <div className="panel" key={i}>
            <div className="panel-header">
              <h3 className="panel-title">{el.name}</h3>
              <div>
              <Tooltip placement="bottomLeft" title='Search'>
                <Button
                  type='text'
                  className='sort-btn'
                  size='small'
                  onClick={() => handleSearch(el.id)}
                  >
                  {categoryIndex === el.id && showSearch ? <i className="ri-close-fill" /> : <i className="ri-search-line" />}
                </Button>
                  </Tooltip>
                  <Tooltip placement="bottomLeft" title='Sort by Carbon'>
                <Button
                  type='text'
                  className='sort-btn'
                  size='small'
                  onClick={() => handleSort(el.id)}
                >
                  {categoryIndex === el.id && isReverseSort ? <i className="ri-sort-asc" /> : <i className="ri-sort-desc" />}
                </Button>
                  </Tooltip>
              </div>
            </div>
            {categoryIndex === el.id && showSearch && (
              <div>
                <Input
                  className='search'
                  onChange={(e) => handleChangeSearch(e.target.value)}
                  placeholder='Type project name..'
                  value={keyword}
                  autoFocus
                  suffix={
                    keyword.length ? <p className='centerize' onClick={() => setKeyword("")}><i className="ri-close-circle-fill" /></p> : null
                  }
                />
              </div>
            )}
            {displayCardByCategory(el.id)}
            <div className="panel-footer" />
          </div>
        ))}
      </Col>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  res
}) => {
  try {
    const getCategoryList = await axios.get(`https://backend.claudiafelicia.com/api/collections/category_fairatmos/records`)
    const getProjectList = await axios.get(`https://backend.claudiafelicia.com/api/collections/project_fairatmos/records?&expand=category`)
    return {
      props: {
        categoryList: getCategoryList.data.items,
        projectList: getProjectList.data.items
      },
    }
  } catch {
    res.statusCode = 404;
    return {
      props: {}
    };
  }
};