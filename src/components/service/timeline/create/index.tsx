export const TimelineCreate = () => {
  return (
    <div>
      <h1>타임라인 만들기</h1>
      <table className="table-fixed">
        <tbody>
          <tr>
            <td>타임라인 이름</td>
            <td>
              <input className="border-2" />
            </td>
            <td>
              <button>중복 확인</button>
            </td>
          </tr>
          <tr>
            <td>공개 여부</td>
            <td>
              <div>
                <label>
                  <input type="radio" name="public" />
                  <span>공개</span>
                </label>
                <label>
                  <input type="radio" name="public" />
                  <span>비공개</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>프로필 사진</td>
            <td>
              <div>
                <div>Placeholder</div>
                <div>
                  ㅁ너ㅏㅣㄹㅁㄴ아ㅓㅣ럼ㄴ아ㅣㄹㄴㅁㅇㄹ (프로필 사진 안내사항)
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>카테고리</td>
            <td>
              <input className="border-2" />
            </td>
          </tr>
          <tr>
            <td>키워드</td>
            <td>
              <input className="border-2" />
            </td>
          </tr>
          <tr>
            <td>타임라인 설명</td>
            <td>
              <textarea className="border-2" />
            </td>
          </tr>
          <tr>
            <td>주기</td>
            <td>
              <div>
                <label>
                  <input type="radio" name="period" />
                  <span>비정기</span>
                </label>
                <label>
                  <input type="radio" name="period" />
                  <span>정기</span>
                </label>
                <div>
                  <input />
                  <span>ex. 주 1회</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>온/오프라인</td>
            <td>
              <label>
                <input type="radio" name="on" />
                <span>온라인</span>
              </label>
              <label>
                <input type="radio" name="on" />
                <span>오프라인</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button>다 만듦</button>
      </div>
    </div>
  );
};
