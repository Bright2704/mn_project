import React, { useState, useRef } from 'react';
import { Table, Modal, Typography, Card, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TrackingData {
    tracking_id: string;
    mnemonics?: string;
    weight: number;
    wide: number;
    high: number;
    long: number;
    number: number;
    lot_id: string;
    in_cn?: string;
    out_cn?: string;
    in_th?: string;
    user_id: string;
    type_item: string;
    check_product_price?: number;
    transport?: number;
    price_crate?: number;
    other?: number;
    image_item_paths: string[];
    lot_type?: string;
}

interface TrackingTableProps {
    trackingData: TrackingData[];
    calculateVolume: (wide: number, long: number, high: number) => number;
    calculateSum: (key: keyof TrackingData) => number;
}

const TrackingTable: React.FC<TrackingTableProps> = ({ trackingData, calculateVolume, calculateSum }) => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [previewIndex, setPreviewIndex] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState(false);
    const swiperRef = useRef<any>(null);

    // Open image preview modal
    const openImagePreview = (images: string[], index: number) => {
        setPreviewImages(images);
        setPreviewIndex(index);
        setModalOpen(true);

        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideTo(index);
            }
        }, 0);
    };

    // Define columns with explicit type ColumnsType
    const columns: ColumnsType<TrackingData> = [
        { title: 'ล็อต/ลำดับ', render: (record: TrackingData) => `${record.lot_type} ${record.lot_id}`, className: 'header-center' },
        { title: 'รหัสพัสดุ', dataIndex: 'tracking_id', key: 'tracking_id', className: 'header-center' },
        {
            title: 'รูปภาพ',
            render: (record: TrackingData) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    {record.image_item_paths.length > 0 ? (
                        record.image_item_paths.map((image, i) => (
                            <div
                                key={i}
                                onClick={() => openImagePreview(record.image_item_paths, i)}
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            >
                                <Image src={image} alt={`Image ${i + 1}`} layout="responsive" width={20} height={20} />
                            </div>
                        ))
                    ) : (
                        <span>No images</span>
                    )}
                </div>
            ),
            className: 'header-center'
        },
        { title: 'รายการสั่งซื้อ', dataIndex: 'mnemonics', key: 'mnemonics', className: 'header-center' },
        { title: 'จำนวน', dataIndex: 'number', key: 'number', align: 'right', className: 'header-center' },
        { title: 'น้ำหนัก', dataIndex: 'weight', key: 'weight', align: 'right', className: 'header-center' },
        { title: 'กว้าง', dataIndex: 'wide', key: 'wide', align: 'right', className: 'header-center' },
        { title: 'สูง', dataIndex: 'high', key: 'high', align: 'right', className: 'header-center' },
        { title: 'ยาว', dataIndex: 'long', key: 'long', align: 'right', className: 'header-center' },
        {
            title: 'คิว.',
            render: (record: TrackingData) => calculateVolume(record.wide, record.long, record.high).toFixed(4),
            align: 'right',
            className: 'header-center'
        },
        { title: 'ประเภท', dataIndex: 'type_item', key: 'type_item', className: 'header-center' },
        { title: 'ค่าบริการ', render: () => "92.5", align: 'right', className: 'header-center' },
        { title: 'ราคากิโล', render: (record: TrackingData) => (record.weight * record.number).toFixed(2), align: 'right', className: 'header-center' },
        { title: 'ราคาคิว', render: () => "0.00", align: 'right', className: 'header-center' }
    ];

    const totalSum = trackingData.reduce((sum, row) => sum + calculateVolume(row.wide, row.long, row.high) * row.number, 0);
    const warehouseServiceFee = 0.00; // Example value, replace with actual calculation if needed
    const thaiShippingFee = 0.00; // Example value, replace with actual calculation if needed
    const grandTotal = totalSum + warehouseServiceFee + thaiShippingFee;

    return (
        <Card title="รายการรหัสพัสดุ" bordered style={{ marginTop: '16px' }}>
            <Table
                dataSource={trackingData}
                columns={columns}
                rowKey="tracking_id"
                pagination={false}
                bordered
                size="small"
                summary={() => (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={11} className="text-right p-1">
                                รวม
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} className="text-right p-1">
                                <Text strong>{totalSum.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={11} className="text-right p-1">
                                คูปองส่วนลด
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} className="text-right p-1">
                                <Text strong>0.00</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={11} className="text-right p-1">
                                ค่าบริการโกดังไทย
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} className="text-right p-1">
                                <Text strong>{warehouseServiceFee.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={11} className="text-right p-1">
                                <Text type="danger">
                                    (ราคาข้างต้นเป็นเพียงราคาประมาณการ ค่าใช้จ่ายจริงจะคิดตามบิลขนส่งตัวจริงและหักลบคืนเป็นยอดเงินในระบบ)
                                </Text>
                                &nbsp;ค่าจัดส่งในไทย
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} className="text-right p-1">
                                <Text strong>{thaiShippingFee.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={11} className="text-right p-1">
                                สุทธิ
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={3} className="text-right p-1">
                                <Text strong style={{ fontSize: '20px' }}>{grandTotal.toFixed(2)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                )}
            />           
        </Card>
    );
};

export default TrackingTable;
