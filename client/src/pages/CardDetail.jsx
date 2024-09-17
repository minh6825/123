import React, { useEffect, useState } from "react";
import { fetchCar } from "../api";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "@mui/material";
import CarSlide from "../components/CarSlide";
import CarReviews from "../components/CarReviews";

const CardDetail = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var car_id_GET = urlParams.get("id");
  const [addCarDriver, setAddCarDriver] = useState(false);

  const [dataCar, setDataCar] = useState();
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  const fetchData = async () => {
    const res = await fetchCar({ _id: car_id_GET });
    setDataCar(res.data);
  };

  if (!dataCar) return null;

  return (
    <div className=" mx-[5%] mb-20" >
      <Header />
      <div  
        className=" w-[600px] h-[300px]"
        style={{ margin: '0 2%', width: "100%", height: "300px" }}
      >
        <h1 style={{ "font-size": "14px", "font-weight": "bold" }}>
          Cho thuê xe {dataCar?.carname}
        </h1>
        <div className="mt-10">
          <img
            className="object-contain rounded-md h-[300px] w-[600px]"
            width={300}
            height={300}
            style={{
              height: "300px",
              "max-width": "321px",
              height: "auto",
              float: "left",
              padding: "3px",
              border: "1px solid #CCCCCC",
            }}
            src={dataCar?.image}
          />

          <div class="col-xs-12 col-md-6">
            <div class="col-xs-12 col-md-12">
              Đặt xe xin gọi:{" "}
              <a
                href="tel:0913218772"
                color="#990000"
                style={{'font-weight':'bold'}}
              >
                0389165923
              </a>
            </div>

            <div class="col-xs-12 col-md-12 ">
              <span style={{'font-weight':'bold'}}>
                Quý khách có thể liên hệ dịch vụ
                <b style={{color:'#f00'}}>
                  Cho thuê xe {dataCar.carname}
                </b>{" "}
                bằng các phương thức:
              </span>
              <br />
              - 43/46 Vườn Lài, An Phú Đông, quận 12, tp Hồ Chí Minh
              <br />
              - Email kinh doanh: Dothanhphuoc03@gmail.com
              <br />
              - Ký hợp đồng tại địa chỉ khách hàng <br />
            </div>
            <div>
              <i>
                <b>
                  Để tránh sự nhầm lẫn khi giao dịch Cty Hoa Mai khuyến cáo:
                </b>
                <br />- Hợp đồng ký kết phải có <b>dấu đỏ của Công ty</b>.<br />
                - <b>Email</b>Dothanhphuoc03@gmail.com
                <br />- Ngoài giờ làm việc (từ 18:00 đến 8:00 sáng hôm sau), để
                đặt xe vui lòng gọi trực tiếp 0389165923, xin cám ơn
              </i>
            </div>
            <div>
              <span style={{'font-weight':'bold'}}>Giải đáp thắc mắc 24/7: </span>
            </div>
            <div>
              <span style={{'font-weight':'bold','text-align':'center', 'font-size':'18px', 'padding-left':'30px', 'padding-top':'20px'}}>
                {" "}
                0913.21.87.72 / 0972.84.72.72{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 text-[18px] flex flex-col  w-full "  style={{margin: '0 2%', width: '100%'}} >
        <p >
          <b>Giá thuê</b>: {dataCar?.pricerent} đ
        </p>
        <p >
          <b>Công ty</b>: {dataCar?.carcompany}
        </p>
        <p >
          <b>Loại xe</b>: {dataCar?.cartype}
        </p>
        <div>
          <Link
            className="btn btn-primary " style={{margin: '10px 0px'}}
            to={
              "/thue-xe?&id=" +
              dataCar?._id +
              "&carname=" +
              dataCar?.carname +
              "&pricerent=" +
              dataCar?.pricerent +
              "&carDriver=" +
              addCarDriver
            }
          >
            Thuê Xe
          </Link>
          <div>
            <label htmlFor="">Thêm tài xế riêng</label>
            <Checkbox
              value={addCarDriver}
              onChange={(e) => setAddCarDriver((pre) => !pre)}
            />
          </div>
        </div>
        <div 
          variant="h5"
          className="text-wrap text-[18px]"
          color="textPrimary" 
        >
          <p>Thông tin về xe: </p>
          <div dangerouslySetInnerHTML={{ __html: dataCar?.description }}></div>
        </div>
      </div>
      <CarReviews carId={car_id_GET} />
      <CarSlide />
    </div>
  );
};

export default CardDetail;
