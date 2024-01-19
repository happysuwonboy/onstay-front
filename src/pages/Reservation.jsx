import PageTitle from '../components/common/PageTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserInfo from '../util/useUserInfo';
import ReservationContent from '../components/reservation/ReservationContent';
import ConfirmModal from '../components/common/ConfirmModal';

export function Reservation() {
    const userInfo = useUserInfo();
    const navigate = useNavigate();

    // 모달창 확인 버튼 클릭
    const handleConfirm = (e) => {
        navigate('/login');
    };

    // 모달창 닫기 버튼 클릭
    const handleModal = (e) => {
        navigate('/');
    };
    
    return userInfo.user_id ? (
        <main className="reservation_section">
            <PageTitle title='RESERVATION'/>
            <ReservationContent />
        </main>
    ) : 
        <div className='modal'>
            <ConfirmModal handleModal={handleModal} 
                            handleConfirm={handleConfirm} 
                            noti_1='로그인이 필요한 서비스입니다' 
                            noti_2='로그인 창으로 이동하시겠습니까?' />
        </div>
}