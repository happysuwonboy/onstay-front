import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PagiNation from 'react-js-pagination';
import { useLocation } from 'react-router-dom';
import NoticeSearch from './NoticeSearch';
import NoticeTable from './NoticeTable';
import useUserInfo from '../../util/useUserInfo';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function NoticeContent(props) {
  const userInfo = useUserInfo();
  const location = useLocation();
  const detailPage = location.state ? location.state.page : null;
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectOption, setSelectOption] = useState('title');
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const searchParams = {
    page: page,
    pageItem: 5,
    searchTerm: searchTerm,
    selectOption: selectOption,
    startDate: startDate === null ? null : new Date(startDate).toISOString().split('T')[0],
    endDate: endDate === null ? null : new Date(endDate).toISOString().split('T')[0]
  };

  // detailPage 값을 기반으로 이전 페이지 상태를 detailPage 값으로 page 설정
  useEffect(() => {
    if (detailPage) {
      setPage(parseInt(detailPage));
    } else {
      setPage(1);
    }
  }, [detailPage]);

  // 데이터 요청을 처리하는 함수
  const fetchData = () => {
    axios
      .post(`${apiBaseUrl}/notice/`, searchParams)
      .then((result) => {
        if (result.data && result.data.length > 0) {
          setNoticeList(result.data);
          setTotalCount(result.data[0].total_rows);
          setNoSearchResults(false);
          props.setCheckList(result.data);
        } else {
          setNoSearchResults(true);
        }
      })
      .catch((error) => console.log(error));
  };

  // 최초 렌더링 시 페이지별 데이터를 가져오도록 useEffect 설정
  useEffect(() => {
    fetchData();
  }, [page]);

  // 검색어 변경 시 데이터 요청
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim() !== '' || searchTerm.trim() === '') {
        fetchData();
      } else if (startDate && endDate) {
        fetchData();
      }
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [page, searchTerm, startDate, endDate]);

  // selectOption 변경 시 초기 데이터 요청
  useEffect(() => {
    fetchData();
  }, [selectOption]);

  // 페이지 변경을 처리하는 함수
  const handleChange = (page) => {
    setPage(page);
  };

const handleAllCheckBoxChange = (e) => {
  props.handleAllCheck(e.target.checked);
};

  return (
    <>
      <table className='notice_table'>
        <thead>
          <tr>
            {userInfo.isAdmin ?
              <th>
                <input type='checkbox' id={`notice_check_all`}
                  onChange={handleAllCheckBoxChange}
                  checked={props.checkedItems?.length === noticeList.length} />
                <label htmlFor={`notice_check_all`} ></label>
              </th> : <th>NO</th>}
            <th>TITLE</th>
            <th>DATE</th>
            {userInfo.isAdmin ? <th>ALTER</th> : <th>VIEW COUNT</th>}
          </tr>
        </thead>
        <tbody>
          {noSearchResults ? <tr className='nosearch'><td>검색 결과가 없습니다.</td></tr> :
            noticeList.map(notice =>
              <NoticeTable
                key={notice.notice_id}
                notice_id={notice.notice_id}
                no={notice.no}
                page={page}
                notice_title={notice.notice_title}
                notice_date={notice.notice_date}
                notice_views={notice.notice_views}
                notice_content={notice.notice_content}
                notice_img={notice.notice_img}
                handleCheckedItems={props.handleCheckedItems}
                checkedItems={props.checkedItems}
              />)}
        </tbody>
      </table>
      {noSearchResults ? null
        : (
          <PagiNation
            activePage={page} // 현재 페이지
            itemsCountPerPage={searchParams.pageItem} // 현재 페이지당 보여줄 아이템 개수
            totalItemsCount={totalCount} // 총 아이템 개수
            pageRangeDisplayed={5} // 보여줄 페이지 범위
            prevPageText={'<'} // 이전을 나타낼 텍스트
            nextPageText={'>'} // 다음을 나타낼 텍스트
            onChange={handleChange} // 함수 호출
          />)}
      <NoticeSearch
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setPage={setPage}
        setSelectOption={setSelectOption}
        selectOption={selectOption}
        setStartDate={setStartDate}
        startDate={startDate}
        setEndDate={setEndDate}
        endDate={endDate}
      />
    </>
  );
};