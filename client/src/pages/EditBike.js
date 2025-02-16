import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addBike, editBike, getAllBikes } from "../redux/actions/bikesActions";

import { useParams } from "react-router-dom";
import AdminDefaultLayout from "../components/AdminDefaultLayout";

function EditBike({ match }) {
  const { bikeid } = useParams();
  const { bikes } = useSelector((state) => state.bikesReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [bike, setbike] = useState();
  const [totalbikes, settotalbikes] = useState([]);
  useEffect(() => {
    if (bikes.length == 0) {
      dispatch(getAllBikes());
    } else {
      //find by id
      settotalbikes(bikes);
      // setbike(bikes.find((o) => o._id == match.params.bikeid));
      setbike(bikes.find((o) => o._id == bikeid));
      console.log(bike);
    }
  }, [bikes]);

  function onFinish(values) {
    values._id = bike._id;

    dispatch(editBike(values));
    console.log(values);
  }

  return (
    <AdminDefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalbikes.length > 0 && (
            <Form
              initialValues={bike}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Bike</h3>

              <hr />
            
              <Form.Item
              //Adding form for the data
                name="name"
                label="Bike name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Availabel Bikes"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Type / Description"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>


              <Form.Item name='type' label='Description' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit BIKE</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </AdminDefaultLayout>
  );
}

export default EditBike;
