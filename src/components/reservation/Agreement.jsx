import React, { useEffect, useState } from 'react';

export default function Agreement(props) {
  const { isValidDated, setIsAgree, setBtnText, nightCnt, payPrice, acc_name } = props;
  const [ checkboxes, setCheckboxes ] = useState({
    all : false,
    personal : { checked : false, showContent : '' },
    minor : { checked : false, showContent : '' },
    refund : { checked : false, showContent : '' }
  });

  // 약관동의 유효성 검사
  useEffect(() => {
    validateAgreements();
  }, [ checkboxes ]);

  // 약관동의 유효성 검사 함수
  const validateAgreements = () => {
    const allAgreed = checkboxes.personal.checked && checkboxes.minor.checked && checkboxes.refund.checked;
    setIsAgree(allAgreed);
    // isValidDated && setBtnText(`${nightCnt}박 : ₩${payPrice.toLocaleString()} 결제하기`)
  };

  // 약관 동의 check 이벤트 핸들러 ( 전체 동의와 개별 동의 클릭 구현 )
  const handleCheckChange = (e) => {
    const { id, checked } = e.target;

    if (id === 'all') {
      setCheckboxes({
        all : checked,
        personal : { checked, showContent : checked ? 'show_content' : '' },
        minor : { checked, showContent : checked ? 'show_content' : '' },
        refund : { checked, showContent : checked ? 'show_content' : '' }
      });
    } else {
      setCheckboxes(prev => {
        const currentCheckboxes = {
          ...prev,
          [id] : {
            ...prev[id],
            checked
          }
        };

        const allChecked = Object.values(currentCheckboxes)
          .filter(checkInput => typeof checkInput === 'object')
          .every(checkValue => checkValue.checked);
        
        return {
          ...currentCheckboxes,
          all : allChecked
        };
      });
    }
  };

  // 상세보기 버튼 클릭시 내용 토글
  const handleClick = (e) => {
    const id = e.currentTarget.className;
    setCheckboxes(prev => ({
      ...prev,
      [id] : { 
        ...prev[id],
        showContent: !prev[id]?.showContent ? 'show_content' : '',
      }
    }));
  };


  return(
    <div className='agreement_container'>
      <p>이용자 약관 동의</p>
      <div className='all_checkbox'>
        <input type='checkbox' id='all' onChange={handleCheckChange} checked={checkboxes.all} />
        <label htmlFor='all'>사용자 약관 전체 동의</label>
      </div>
      <div>
        <div className='check_box'>
          <div>
            <input type='checkbox' id='personal' onChange={handleCheckChange} checked={checkboxes.personal.checked} />
            <label htmlFor='personal'>개인정보 제 3자 제공 동의 (필수)</label>
          </div>
          <span className='personal'onClick={handleClick} >상세보기</span>
        </div>
        <div className={`detail_content ${checkboxes.personal.showContent}`}>
          <p>
          (주)스테이폴리오는 예약 시스템 제공 과정에서 예약자 동의 하에 서비스 이용을 위한 예약자 개인정보를 수집하며, 수집된 개인정보는 제휴 판매자(숙소)에게 제공됩니다.
          정보 주체는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이 제한됩니다.
          </p>
          <p>
            <span>- 제공 받는 자 : {acc_name}</span>
            <span>- 제공 목적: 제휴 판매자(숙소)와 이용자(회원)의 예약에 대한 서비스 제공, 계약의 이행(예약확인, 이용자 확인), 민원 처리 등 소비자 분쟁 해결을 위한 기록 보존</span>
            <span>- 제공 정보: 예약번호, 아이디, 성명, 휴대전화 번호, 이메일, 인원 정보, 생년월일(필요한 경우), 동행 투숙객 정보(필요한 경우)</span>
            <span>- 보유 및 이용 기간 : 5년</span>
          </p>
        </div>
      </div>
      <div>
        <div className='check_box'>
          <div>
            <input type='checkbox' id='minor' onChange={handleCheckChange} checked={checkboxes.minor.checked} />
            <label htmlFor='minor'>미성년자(청소년) 투숙 기준 동의 (필수)</label>
          </div>
          <span className='minor' onClick={handleClick}>상세보기</span>
        </div>
        <div className={`detail_content ${checkboxes.minor.showContent}`}>
          <p>
          <span>스테이 소재지 : 대한민국</span>
          <span>1. 만 19세 미만 미성년자(청소년)의 경우 예약 및 투숙이 불가합니다.</span>
          <span>2. 만 19세 미만 미성년자(청소년)가 투숙을 원하는 경우 보호자(법정대리인)가 필수 동행해야 합니다.</span>
          <span>3. 이용일 당일 미성년자(청소년) 투숙 기준 위반이 확인되는 경우 환불없이 퇴실 조치됩니다.</span>
          </p>
        </div>
      </div>
      <div>
        <div className='check_box'>
          <div>
            <input type='checkbox' id='refund' onChange={handleCheckChange} checked={checkboxes.refund.checked} />
            <label htmlFor='refund'>환불규정에 대한 동의 (필수)</label>
          </div>
          <span className='refund' onClick={handleClick}>상세보기</span>
        </div>
        <div className={`detail_content ${checkboxes.refund.showContent}`}>
          <p>
            <span>- 결제 4일 전 : 100% 환불</span>
              <span>- 결제 3일 전 : 50% 환불</span>
              <span>- 결제 2일 전 : 교환/환불 x </span>
          </p>
          <p>
            <span>1. 결제 당일 취소하는 경우에도 예약 확정 후에는 동일한 환불 규정이 적용됩니다.</span>
            <span>2. 천재 지변으로 이용일 당일의 선박 / 항공편이 취소된 경우, 결항 확인서를 보내주시면 전체 환불해 드립니다.</span>
            <span>- 숙박권의 재판매를 비롯하여 양도, 양수, 교환을 금지합니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
}