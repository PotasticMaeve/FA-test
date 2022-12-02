import { Badge, Button, Card, Col, Typography } from 'antd'
import { useState } from 'react';
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'

export default function Project() {
  const [expand, setExpand] = useState(false)
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [indexOpen, setIndexOpen] = useState(0)

  return (
    <Layout seo={{ title: 'Projects' }}>
      <Col className="panel-container">
        <div className="panel">
          <h3 className="panel-title">Category A</h3>
          <ul className="panel-items">
            {PROJECT_LIST.map((el, i) => (
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
                    {expand ? (
                      <Typography.Paragraph
                        className='card-desc'
                      >
                        {el.project_overview}
                      </Typography.Paragraph>
                    ) : (
                      <Typography.Paragraph
                        ellipsis={{
                          rows: expand ? undefined : 3,
                          expandable: expand,
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
                      onClick={() => setExpand(!expand)}
                    >
                      {expand ? 'Hide' : 'Read More'}
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