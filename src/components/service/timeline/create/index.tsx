import React, { useState } from 'react';
import { requestCheckTimelineName } from '../../../../api/timeline';
import { isAxiosError } from 'axios';

export const TimelineCreate = () => {
  const [isUnique, setIsUnique] = useState(false);
  const [nameMessage, setNameMessage] = useState('');

  const handleCheckName = async (formData: FormData) => {
    if (isUnique) {
      return;
    }

    const name = formData.get('name') as string;

    try {
      const { status } = await requestCheckTimelineName(name);

      if (status === 200) {
        setIsUnique(true);
        setNameMessage('사용 가능한 이름입니다.');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setNameMessage(error.response?.data.message);
      } else {
        setNameMessage('중복 확인 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
  };

  const handleCreateAction = (formData: FormData) => {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    // 눌린 버튼이 무엇인지 확인
    switch (submitter?.name) {
      case 'checkname':
        handleCheckName(formData);
        break;
      case 'submit':
        handleCreateAction(formData);
        break;
      default:
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <td className="h-24 py-4">
                <div className="flex items-start gap-4">
                  <input
                    name="name"
                    className="flex-1"
                    onChange={() => {
                      setIsUnique(false);
                      setNameMessage('');
                    }}
                  />
                  <button
                    type="submit"
                    name="checkname"
                    value="1"
                    className="bg-black text-white px-10 py-1 text-2xl font-bold"
                  >
                    중복 확인
                  </button>
                </div>
                <div className="text-xl">{nameMessage}</div>
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
                <textarea
                  className="border-2 align-middle"
                  name="description"
                />
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
            name="submit"
            className="cursor-pointer bg-black text-white px-10 py-1 text-3xl font-bold"
          >
            다 만듦
          </button>
        </div>
      </div>
    </form>
  );
};
