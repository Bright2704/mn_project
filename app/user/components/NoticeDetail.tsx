import React from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
const { Title } = Typography;

const NoticeDetail: React.FC = () => {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginLeft: '-8px', marginRight: '-8px' }}>
            <Col sm={17} lg={17} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                <Card bordered className="notice_detail">
                    <div className="ant-card-body border-4 rounded-full">
                        <Space direction="vertical" size={8}>
                            <Title level={2} className="post-header__title">ประกาศแจ้งสินค้าไม่มีเจ้าของ</Title>
                            <div>09/05/2023</div>
                            <div>
                                <p><span style={{ fontSize: '30px', color: '#e11717' }}><strong>ประกาศแจ้งสินค้าไม่มีเจ้าของ</strong></span></p>
                                <p>💛😊แจ้งลูกค้าทุกๆท่าน สำหรับท่านใดที่สั่งสินค้าเข้ามาแล้ว สินค้าไม่เข้าระบบ, หรือทางร้านค้าระบุชื่อไม่ครบ, ไม่ชัดเจนส่งผลให้สินค้าของท่านไม่เข้าระบบ </p>
                                <p> <strong>--------------------------------</strong></p>
                                <p>💗ขณะนี้ทางเจ้าหน้าที่ได้มีการอัพเดทสินค้าไม่มีเจ้าของไว้เป็นที่เรียบร้อยแล้ว สามารถตรวจสอบรายการได้ที่เมนูสินค้าไม่มีเจ้าของ จึงแจ้งมาเพื่อทราบ ขอบคุณครับ</p>
                                <p>😉<strong><u>***เพิ่มเติม สำหรับสินค้า ไม่มีเจ้าของ ระยะเวลานับจากวันที่สินค้ามีสถานะเข้าโกดังไทยตั้งแต่ 6 เดือนขึ้นไป ทางเราขอนุญาตนำสินค้าของท่านออกจำหน่ายเพื่อชดเชยให้กับค่านำเข้าสินค้าที่ทางเราได้สำรองจ่ายไปก่อน  และทางเราจะไม่รับผิดชอบต่อค่าความเสียหายที่อาจเกิดขึ้นทุกกรณี***</u></strong></p>
                                <p> <strong>--------------------------------</strong></p>
                                <p>💗หากท่านตรวจสอบแล้วว่าสินค้านี้ แทรคนี้เป็นของท่าน ท่านสามารถนำหลักฐานการสั่งซื้อยืนยันแสดงตัวตนเป็นเจ้าของสินค้าได้ ตามวิธีต่อไปนี้ </p>
                                <p><a href="https://www.plm-cargo.com/manual/goodconfirm">More Info</a></p>
                            </div>
                        </Space>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

export default NoticeDetail;
