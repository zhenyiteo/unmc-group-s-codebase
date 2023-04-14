import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
//import * as api from '../../api/api';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

function PostJobForm() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [accountName, setAccountName] = useState('');


  useEffect(() => {
   
    // retrieve account name from sessionStorage
    const storedAccountName = sessionStorage.getItem('accountName');
    if (storedAccountName) {
      setAccountName(storedAccountName);
      console.log(accountName);
    }
  }, []);


  const handleSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(
        'https://pwa0kjtg11.execute-api.us-east-1.amazonaws.com/prod/postjob',
        {
          ShipperID: accountName,
          originaddress: values.originaddress,
          originpostcode: values.originpostcode,
          destaddress: values.destaddress,
          destpostcode: values.destpostcode,
          originstate: values.originstate,
          deststate: values.deststate,
          recipientname: values.recipientname,
          recipientcontact: values.recipientcontact,
          shipmentduration: values.shipmentduration,
         // expirytime: values.expirytime,
          shipmentweight: values.shipmentweight,
          itemlength: values.itemlength,
          itemwidth: values.itemwidth,
          itemheight: values.itemheight,
          shipmentmethod: values.shipmentmethod,

          itemtype: values.itemtype,
          allowance: values.allowance,
          penalty: values.penalty,
          remarks: values.remarks,
        }
      )
      .then((response) => {
        console.log(response);
        message.success('Form submitted successfully!');
        setIsLoading(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to submit form!');
      });
  };

  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      name="basic"
      style={{ maxWidth: '1000px', marginTop: 40 }}
    >
      <h1>Post Job</h1>

      <Row gutter={16}>
        <Col span="8">
          <Form.Item
            label="Origin Address"
            name="originaddress"
            rules={[
              { required: true, message: 'Please Input Original Address' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item
            label="Original Postcode"
            name="originpostcode"
            rules={[
              { required: true, message: 'Please Input Original Postcode' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Original State"
            name="originstate"
            rules={[{ required: true, message: 'Please Select Origin State' }]}
          >
            <Select
              defaultValue={' '}
              options={[
                {
                  value: 'Pulau Pinang',
                  label: 'Pulau Pinang',
                },
                {
                  value: 'Kuala Lumpur',
                  label: 'Kuala Lumpur',
                },
                {
                  value: 'Selangor',
                  label: 'Selangor',
                },
                {
                  value: 'Melaka',
                  label: 'Melaka',
                },
                {
                  value: 'Johor',
                  label: 'Johor',
                },
                {
                  value: 'Perlis',
                  label: 'Perlis',
                },
                {
                  value: 'Kedah',
                  label: 'Kedah',
                },
                {
                  value: 'Kelantan',
                  label: 'Kelantan',
                },
                {
                  value: 'Terengganu',
                  label: 'Terengganu',
                },
                {
                  value: 'Perak',
                  label: 'Perak',
                },
                {
                  value: 'Pahang',
                  label: 'Pahang',
                },
                {
                  value: 'Negeri Sembilan',
                  label: 'Negeri Sembilan',
                },
                {
                  value: 'Sabah',
                  label: 'Sabah',
                },
                {
                  value: 'Sarawak',
                  label: 'Sarawak',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span="8">
          <Form.Item
            label="Destination Address"
            name="destaddress"
            rules={[
              {
                required: true,
                message: 'Please Input Destination Address',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item
            label="Destination Postcode" // reminder : oso need shipper page design change, ask joshua later, destination state?
            name="destpostcode"
            rules={[
              {
                required: true,
                message: 'Please Input Destination Postcode',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Destination State"
            name="deststate"
            rules={[
              {
                required: true,
                message: 'Please Input Destination State',
              },
            ]}
          >
            <Select
              defaultValue={' '}
              options={[
                {
                  value: 'Pulau Pinang',
                  label: 'Pulau Pinang',
                },
                {
                  value: 'Kuala Lumpur',
                  label: 'Kuala Lumpur',
                },
                {
                  value: 'Selangor',
                  label: 'Selangor',
                },
                {
                  value: 'Melaka',
                  label: 'Melaka',
                },
                {
                  value: 'Johor',
                  label: 'Johor',
                },
                {
                  value: 'Perlis',
                  label: 'Perlis',
                },
                {
                  value: 'Kedah',
                  label: 'Kedah',
                },
                {
                  value: 'Kelantan',
                  label: 'Kelantan',
                },
                {
                  value: 'Terengganu',
                  label: 'Terengganu',
                },
                {
                  value: 'Perak',
                  label: 'Perak',
                },
                {
                  value: 'Pahang',
                  label: 'Pahang',
                },
                {
                  value: 'Negeri Sembilan',
                  label: 'Negeri Sembilan',
                },
                {
                  value: 'Sabah',
                  label: 'Sabah',
                },
                {
                  value: 'Sarawak',
                  label: 'Sarawak',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span="6">
          <Form.Item
            label="Recipient Name"
            name="recipientname"
            rules={[{ required: true, message: 'Please Input Recipient Name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            label="Recipient Contact"
            name="recipientcontact"
            rules={[{ required: true, message: 'Please Input Contact Number' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Shipment Duration"
            name="shipmentduration"
            rules={[
              { required: true, message: 'Please Input Shipment Duration' },
            ]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'HR'}
                options={[
                  {
                    value: 'HR',
                    label: 'HR',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>
        {/* <Col span="6">
          <Form.Item
            label="Expiry Time"
            name="expirytime"
            rules={[{ required: true, message: 'Please Input Expiry Time' }]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'HR'}
                options={[
                  {
                    value: 'HR',
                    label: 'HR',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col> */}
      </Row>
      <Row gutter={16}>
        <Col span="5">
          <Form.Item
            label="Item Weight"
            name="shipmentweight"
            rules={[
              { required: true, message: 'Please Input Shipment Weight' },
            ]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'KG'}
                options={[
                  {
                    value: 'KG',
                    label: 'KG',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item
            label="Item Length"
            name="itemlength"
            rules={[{ required: true, message: 'Please Input Length' }]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'M'}
                options={[
                  {
                    value: 'M',
                    label: 'M',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span="4">
          <Form.Item
            label="Item Width"
            name="itemwidth"
            rules={[{ required: true, message: 'Please Input Width' }]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'M'}
                options={[
                  {
                    value: 'M',
                    label: 'M',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item
            label="Item Height"
            name="itemheight"
            rules={[{ required: true, message: 'Please Input Height' }]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'M'}
                options={[
                  {
                    value: 'M',
                    label: 'M',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            label="Shipment Method"
            name="shipmentmethod"
            rules={[
              { required: true, message: 'Please Select Shipment Method' },
            ]}
          >
            <Select
              defaultValue={' '}
              options={[
                {
                  value: 'air',
                  label: 'Air',
                },
                {
                  value: 'water',
                  label: 'Water',
                },
                {
                  value: 'motor',
                  label: 'Motor',
                },
                {
                  value: 'train',
                  label: 'Train',
                },
                {
                  value: 'truck',
                  label: 'Truck',
                },
                {
                  value: 'car',
                  label: 'Car',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span="5">
          <Form.Item
            label="Item Type"
            name="itemtype"
            rules={[{ required: true, message: 'Please Select Item Type' }]}
          >
            <Select
              defaultValue={' '}
              options={[
                {
                  value: 'glass',
                  label: 'Glass',
                },
                {
                  value: 'flammable',
                  label: 'Flammable',
                },
                {
                  value: 'electronics',
                  label: 'Electronics',
                },
                {
                  value: 'frozen',
                  label: 'Frozen',
                },
                {
                  value: 'medicine',
                  label: 'Medicine',
                },
                {
                  value: 'daily',
                  label: 'Daily',
                },
                {
                  value: 'dangerous',
                  label: 'Dangerous',
                },
                {
                  value: 'plastic',
                  label: 'Plastic',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span="5">
          <Form.Item
            label="Shipment Allowance"
            name="allowance"
            rules={[
              {
                required: true,
                message: 'Please Select Shipment Allowance',
              },
            ]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'RM'}
                options={[
                  {
                    value: 'RM',
                    label: 'RM',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span="6">
          <Form.Item
            label="Shipment Penalty"
            name="penalty"
            rules={[
              { required: true, message: 'Please Select Shipment Penalty' },
            ]}
          >
            <div style={{ display: 'flex' }}>
              <Input></Input>
              <Select
                style={{ marginLeft: 5 }}
                defaultValue={'RM'}
                options={[
                  {
                    value: 'RM',
                    label: 'RM',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </Col>
{/* **********************CHECK *******************last time it was col span 9 */}
        

        <Col span="6">
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[{ required: true, message: 'Please enter some remarks' }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Enter some remarks"
            />
          </Form.Item>
        </Col>
        <Col span="9">
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Post Job
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default PostJobForm;
