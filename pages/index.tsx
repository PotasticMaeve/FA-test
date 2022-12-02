import { Badge, Button, Card, Col, Typography } from 'antd'
import { useState } from 'react';
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'
import _ from 'lodash'

export default function Project() {
  const [expand, setExpand] = useState(false)
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
              {isReverseSort ? <i className="ri-sort-desc" /> : <i className="ri-sort-asc" />}
            </Button>
          </div>
          <ul className="panel-items">
            {(_.orderBy(PROJECT_LIST, ['carbon'],[isReverseSort ? 'desc' : 'asc'])).map((el, i) => (
              <li key={i}>
                <Card
                  cover={
                    <img
                      alt={el.title}
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                >
                  <Badge count={el.carbon} color='#E97777' />
                  <Typography.Text className="card-title">{el.title}</Typography.Text>
                  <Col span={24}>
                    {index === i ? (
                      <Typography.Paragraph
                        className='card-desc'
                      >
                        {el.project_overview}
                      </Typography.Paragraph>
                    ) : (
                      <Typography.Paragraph
                        ellipsis={{
                          rows: index === i ? undefined : 3,
                          expandable: index === i,
                          symbol: <></>,
                          onEllipsis: (ell) => setIsEllipsis(ell)
                        }}
                        className='card-desc'
                      >
                        {el.project_overview}
                      </Typography.Paragraph>
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