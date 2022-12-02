import { Button, Card, Col, Typography, Input } from 'antd'
import { useState } from 'react';
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'
import _ from 'lodash'

const { Text, Paragraph } = Typography

export default function Project() {
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [index, setIndex] = useState(undefined)
  const [isReverseSort, setIsReverseSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [content, setContent] = useState(PROJECT_LIST)

  const handleChangeSearch = (key) => {
    if(key !== ""){
      const data = PROJECT_LIST.filter((el) => {
        if(el.title.toLowerCase().includes(key.toLowerCase())){
          return el
        }
      })
      setContent(data)
    }else{
      setContent(PROJECT_LIST)
    }
  }

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
                autoFocus
              />
            </div>
          )}
          <ul className="panel-items">
            {(_.orderBy(content, ['carbon'], [isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
              <li key={i}>
                <Col className='badge-carbon'>
                  <i className="ri-virus-fill" />
                  <Text>{el.carbon}</Text>
                </Col>
                <Card
                  cover={
                    <img
                      alt={el.title}
                      src={el.image}
                    />
                  }
                >
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
          </ul>
          <div className="panel-footer" />
        </div>
      </Col>
    </Layout>
  )
}