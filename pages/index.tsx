import { Button, Card, Col, Typography, Input, Image } from 'antd'
import { useEffect, useState } from 'react';
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'
import _ from 'lodash'

const { Text, Paragraph } = Typography

export default function Project() {
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [index, setIndex] = useState(undefined)
  const [isReverseSort, setIsReverseSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [content, setContent] = useState(PROJECT_LIST)

  const handleChangeSearch = (key) => {
    setKeyword(key)
    if (key !== "") {
      const data = PROJECT_LIST.filter((el) => {
        if (el.title.toLowerCase().includes(key.toLowerCase())) {
          return el
        }
      })
      setContent(data)
    } else {
      setContent(PROJECT_LIST)
    }
  }

  useEffect(() => {
    if (!keyword.length) {
      setContent(PROJECT_LIST)
    }
  }, [keyword])

  return (
    <Layout seo={{ title: 'Projects' }}>
      <Col className="panel-container">
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Category A</h3>
            <div>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <i className="ri-close-fill" /> : <i className="ri-search-line" />}
              </Button>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setIsReverseSort(!isReverseSort)}
              >
                {isReverseSort ? <i className="ri-sort-asc" /> : <i className="ri-sort-desc" />}
              </Button>
            </div>
          </div>
          {showSearch && (
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
          <ul className="panel-items">
            {!content.length ? (
              <div className='centerize empty-state'>
                <Image
                  alt='data-not-found'
                  src='/images/not-found.png'
                  height={80}
                  width={80}
                  preview={false}
                />
                <Text>Data Not Found</Text>
              </div>
            ) : (
              <>
                {(_.orderBy(content, ['carbon'], [isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
                  <li key={i}>
                    <Col className='badge-carbon centerize'>
                      <i className="ri-virus-fill" />
                      <Text>{el.carbon}</Text>
                    </Col>
                    <Card
                      cover={
                        <Image
                          alt={el.title}
                          src={el.image}
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
                            {el.project_overview}
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
                            {el.project_overview}
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
                ))}
              </>
            )}
          </ul>
          <div className="panel-footer" />
        </div>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Category A</h3>
            <div>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <i className="ri-close-fill" /> : <i className="ri-search-line" />}
              </Button>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setIsReverseSort(!isReverseSort)}
              >
                {isReverseSort ? <i className="ri-sort-asc" /> : <i className="ri-sort-desc" />}
              </Button>
            </div>
          </div>
          {showSearch && (
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
          <ul className="panel-items">
            {!content.length ? (
              <div className='centerize empty-state'>
                <Image
                  alt='data-not-found'
                  src='/images/not-found.png'
                  height={80}
                  width={80}
                  preview={false}
                />
                <Text>Data Not Found</Text>
              </div>
            ) : (
              <>
                {(_.orderBy(content, ['carbon'], [isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
                  <li key={i}>
                    <Col className='badge-carbon centerize'>
                      <i className="ri-virus-fill" />
                      <Text>{el.carbon}</Text>
                    </Col>
                    <Card
                      cover={
                        <Image
                          alt={el.title}
                          src={el.image}
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
                            {el.project_overview}
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
                            {el.project_overview}
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
                ))}
              </>
            )}
          </ul>
          <div className="panel-footer" />
        </div>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Category A</h3>
            <div>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <i className="ri-close-fill" /> : <i className="ri-search-line" />}
              </Button>
              <Button
                type='text'
                className='sort-btn'
                size='small'
                onClick={() => setIsReverseSort(!isReverseSort)}
              >
                {isReverseSort ? <i className="ri-sort-asc" /> : <i className="ri-sort-desc" />}
              </Button>
            </div>
          </div>
          {showSearch && (
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
          <ul className="panel-items">
            {!content.length ? (
              <div className='centerize empty-state'>
                <Image
                  alt='data-not-found'
                  src='/images/not-found.png'
                  height={80}
                  width={80}
                  preview={false}
                />
                <Text>Data Not Found</Text>
              </div>
            ) : (
              <>
                {(_.orderBy(content, ['carbon'], [isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
                  <li key={i}>
                    <Col className='badge-carbon centerize'>
                      <i className="ri-virus-fill" />
                      <Text>{el.carbon}</Text>
                    </Col>
                    <Card
                      cover={
                        <Image
                          alt={el.title}
                          src={el.image}
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
                            {el.project_overview}
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
                            {el.project_overview}
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
                ))}
              </>
            )}
          </ul>
          <div className="panel-footer" />
        </div>
      </Col>
    </Layout>
  )
}