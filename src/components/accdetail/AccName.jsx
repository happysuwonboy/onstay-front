import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export function AccName() {
    const [accInfo, setAccInfo] = useState({acc_name:'',address:'',acc_img:''});
    const {accid} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/findstay/acc/${accid}`)
        .then(result => {
            setAccInfo(result.data);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <div className='visual_section'>
            <div className='img_container'><img src={`/assets/images/swiper/${accInfo.acc_img}`} alt="숙소 Swiper 이미지" /></div>
            <div className='text_container'>
                <div className='acc_name'>{accInfo.acc_name}</div>
                <div className='acc_address'>{accInfo.address}</div>
            </div>
            <Link to={`/findstay/acc/gallery/${accid}`} className='gallery_link'><div>사진 모아보기</div></Link>
        </div>
    );
};