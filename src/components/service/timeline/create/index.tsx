import { useState } from 'react';

export const TimelineCreate = () => {
  const [isUnique, setIsUnique] = useState(false);

  const handleCheckName = (formData: FormData) => {
    const name = formData.get('name') as string;
    alert(name);
  };

  const handleCreateAction = (formData: FormData) => {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

  return (
    <form action={handleCreateAction}>
      <div className="pt-8 px-6 flex flex-col gap-6">
        <h1 className="text-4xl font-bold">타임라인 만들기</h1>
        <table
          className="table-fixed border-t-2 border-b-2
        [&_tr]:text-2xl
        [&_tr]:h-18
        [&_tr]:border-b
        [&_td:first-child]:font-semibold
        [&_td_div]:flex
        [&_input]:border-2
      "
        >
          <tbody>
            <tr>
              <td>타임라인 이름</td>
              <td>
                <input name="name" className="w-full" />
              </td>
              <td className="text-right">
                <button
                  type="submit"
                  formAction={handleCheckName}
                  className="bg-black text-white px-10 py-1 text-2xl font-bold"
                >
                  중복 확인
                </button>
              </td>
            </tr>
            <tr>
              <td>공개 여부</td>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="isPublic"
                      value="public"
                      defaultChecked
                    />
                    <span>공개</span>
                  </label>
                  <label>
                    <input type="radio" name="isPublic" value="private" />
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
                    ㅁ너ㅏㅣㄹㅁㄴ아ㅓㅣ럼ㄴ아ㅣㄹㄴㅁㅇㄹ (프로필 사진
                    안내사항)
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>카테고리</td>
              <td>
                <input name="category" />
              </td>
            </tr>
            <tr>
              <td>키워드</td>
              <td>
                <input name="keyword" />
              </td>
            </tr>
            <tr>
              <td>타임라인 설명</td>
              <td>
                <textarea name="description" />
              </td>
            </tr>
            <tr>
              <td>주기</td>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="isRegular"
                      value="irregular"
                      defaultChecked
                    />
                    <span>비정기</span>
                  </label>
                  <label>
                    <input type="radio" value="regular" name="isRegular" />
                    <span>정기</span>
                  </label>
                  <div>
                    <input name="period" />
                    <span>ex. 주 1회</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>온/오프라인</td>
              <td>
                <label>
                  <input type="radio" name="isOn" value="on" defaultChecked />
                  <span>온라인</span>
                </label>
                <label>
                  <input type="radio" name="isOn" value="off" />
                  <span>오프라인</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            type="submit"
            className="cursor-pointer bg-black text-white px-10 py-1 text-3xl font-bold"
          >
            다 만듦
          </button>
        </div>
      </div>
    </form>
  );
};
