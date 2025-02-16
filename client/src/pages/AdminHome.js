import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteBike, getAllBikes } from "../redux/actions/bikesActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
//simport moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import AdminDefaultLayout from "../components/AdminDefaultLayout";
const { RangePicker } = DatePicker;
function AdminHome() {
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalBikes, setTotalbikes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, []);

  console.log(totalBikes);

  useEffect(() => {
    setTotalbikes(bikes);
  }, [bikes]);

  return (
    <>


<style>
            
            {
                `
                @media only screen and (max-width: 1400px) and (min-width: 700px) {
                    .bikeimg {
                        
                        width: 19vw; /* Adjusted width for smaller screens */
                       
                    }
                  }

                  .bike:hover {
                    height: 230px;
                    // font-size: 13px;
                  }

                  @media screen and (max-width: 1340px) and (min-width:992px) {
                    /* Adjust the height of .bike when hovered on smaller screens */
                    .bike:hover {
                      height:260px;
                      // font-size: 13px;
                    }
                  }
                `
            }
        </style>
    <AdminDefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addbike">ADD BIKE</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalBikes.map((bike) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="bike p-2 bs1">
                <img src={bike.image} className="bikeimg" />

                <div className="bike-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{bike.name}</p>
                    <p> Rent Per Hour: ₹ {bike.rentPerHour} /-</p>
                    <p> Type: {bike.fuelType} </p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editbike/${bike._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this bike?"
                      onConfirm={()=>{dispatch(deleteBike({bikeid : bike._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
     </AdminDefaultLayout>
    </>
  );
}

export default AdminHome;
