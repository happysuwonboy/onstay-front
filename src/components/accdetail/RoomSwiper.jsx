import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
  import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export function RoomSwiper() {
  const [roomInfo, setRoomInfo] = useState([]);
  const { accid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/findstay/acc/${accid}/room`)
      .then((result) => {
        /* console.log(result.data); */
        setRoomInfo(result.data);
      })
      .catch((error) => console.log(error));
  }, [accid]);

  return (
    <div className="whole-container">
      <div className="title">ROOM</div> {/* width를 준다 */}
      <Swiper className="room-swiper-container" /* padding을 양쪽에만 준다 */
        spaceBetween={50}
        slidesPerView={2}
        pagination={{ clickable: true }}
      >
        {roomInfo.map((room, index) => (
          <SwiperSlide className="slide" key={index}> {/* relative */} 
              <Link to={`/findstay/room/${room.room_id}`}>
                <img className="swiper-img" /* width:100% */ 
                      src={`/assets/images/room/${room.room_img1}`}
                      alt={room.room_name}
                    />
                <div className="text-container"> {/* absolute */}
                  <div className="room-type">기본형</div>
                  <div className="room-name">{room.room_name}</div>
                  <div className="room-capa">기준 {room.min_capa}명 &#40;최대 {room.max_capa}명&#41;</div>
                  <div className="space-between">
                    <div className="room-price">&#92;{room.room_price}&#126;</div>
                    <div className="room-reserve">예약하기</div>
                  </div>
                </div>
              </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}