import { Button, Card, Col, Typography } from 'antd'
import { useState } from 'react';
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'
import _ from 'lodash'

const { Text, Paragraph } = Typography

export default function Project() {
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [index, setIndex] = useState(undefined)
  const [isReverseSort, setIsReverseSort] = useState(false)

  return (
    <Layout seo={{ title: 'Projects' }}>
      <Col className="panel-container">
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Category A</h3>
            <Button
              type='text'
              className='sort-btn'
              size='small'
              onClick={() => setIsReverseSort(!isReverseSort)}
            >
              {isReverseSort ? <i className="ri-sort-asc" /> : <i className="ri-sort-desc" />}
            </Button>
          </div>
          <ul className="panel-items">
            {(_.orderBy(PROJECT_LIST, ['carbon'], [isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
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
                    {index === i ? (
                      <Paragraph
                        className='card-desc'
                      >
                        {el.project_overview}
                      </Paragraph>
                    ) : (
                      <Paragraph
                        ellipsis={{
                          rows: index === i ? undefined : 3,
                          expandable: index === i,
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
                      onClick={() => index === i ? setIndex(undefined) : setIndex(i)}
                    >
                      {index === i ? 'Hide' : 'Read More'}
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