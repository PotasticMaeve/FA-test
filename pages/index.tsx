import { Avatar, Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'
import Layout from '../src/components/layout'
import PROJECT_LIST from '../src/constants/project-list'

export default function Project() {
  return (
    <Layout seo={{ title: 'Projects' }}>
      <Col className="panel-container">
        <div className="panel">
          <h3 className="panel-title">Tasks to Do</h3>
          <ul className="panel-items">
            {PROJECT_LIST.map((el, i) => (
              <li key={i}>
                <Card
                  style={{ width: '300px' }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={el.title}
                    description={el.project_overview}
                  />
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