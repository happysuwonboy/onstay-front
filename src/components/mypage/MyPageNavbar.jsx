export function MyPageNavbar(props) {
  const {showContent, setShowContent} = props;

  const handleClick = (e) => {
    setShowContent(e.target.dataset.content);
    window.scrollTo({top : 0});
  }

  return (
    <ul className='mypage_navbar'>
      <li  onClick={handleClick} data-content='MyReservation' className={showContent==='MyReservation' ? 'active' : ''}>
        예약 정보
      </li>
      <li  onClick={handleClick} data-content='MyReview' className={showContent==='MyReview' ? 'active' : ''}>
        리뷰 관리
      </li>
      <li onClick={handleClick} data-content='MyCoupon' className={showContent==='MyCoupon' ? 'active' : ''}>
        보유 쿠폰
      </li>
      <li onClick={handleClick} data-content='MyLoveStay' className={showContent==='MyLoveStay' ? 'active' : ''}>
        관심 스테이
      </li>
      <li onClick={handleClick} data-content='MyEdit' className={showContent==='MyEdit' ? 'active' : ''}>
        회원 정보 수정
      </li>
      <li onClick={handleClick} data-content='MyQNA' className={showContent==='MyQNA' ? 'active' : ''}>
        1:1 문의
      </li>
    </ul>
  )
}
