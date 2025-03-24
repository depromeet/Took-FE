'use client';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';

const TermsView = () => {
  const handleBack = useHistoryBack();

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <Appbar page="mypage" title="이용약관" onLeftClick={handleBack} />
      <main className={cn(spacingStyles({ paddingY: 'lg', paddingX: 'ml' }))}>
        <TermsItem />
      </main>
    </div>
  );
};

const TermsItem = () => {
  return (
    <div
      className={cn(spacingStyles({ paddingBottom: 'lg' }), 'flex w-full flex-col space-y-4 text-body-5 text-gray-50')}
    >
      <section>
        <h3 className="font-semibold">제1조 (목적)</h3>
        <p>
          이 약관은 TOOK(이하 &quot;회사&quot;)가 제공하는 TOOK 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자 간의
          권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">제2조 (용어의 정의)</h3>
        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ol>
          <li>
            &quot;서비스&quot;라 함은 구현되는 단말기(PC, TV, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이
            TOOK가 제공하는 관련 제반 서비스를 의미합니다.
          </li>
          <li>&quot;이용자&quot;란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
          <li>
            &quot;회원&quot;이라 함은 회사와 서비스 이용계약을 체결하고, 이용자 아이디(ID)를 부여받은 자를 말합니다.
          </li>
          <li>&quot;비회원&quot;이라 함은 회원으로 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제3조 (약관의 게시와 개정)</h3>
        <ol>
          <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 TOOK의 초기 서비스 화면(전면)에 게시합니다.</li>
          <li>
            회사는 &quot;약관의 규제에 관한 법률&quot;, &quot;정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
            &quot;정보통신망법&quot;)&quot; 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
          </li>
          <li>
            회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 TOOK의 초기화면에 그 적용일자
            7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관 내용을 변경하는 경우에는 최소한
            30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정 후 내용을 명확하게 비교하여
            이용자가 알기 쉽도록 표시합니다.
          </li>
          <li>
            회사가 전항에 따라 개정약관을 공지 또는 통지하면서 이용자에게 30일 기간 내에 의사표시를 하지 않으면
            의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 고지하였음에도 이용자가 명시적으로 거부의사를
            표시하지 아니한 경우 이용자가 개정약관에 동의한 것으로 봅니다.
          </li>
          <li>
            이용자가 개정약관의 적용에 동의하지 않는 경우 회사는 개정약관의 내용을 적용할 수 없으며, 이 경우 이용자는
            이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는
            이용계약을 해지할 수 있습니다.
          </li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제4조 (약관 외 준칙)</h3>
        <p>이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관계법령 또는 상관례에 따릅니다.</p>
      </section>

      <section>
        <h3 className="font-semibold">제5조 (이용계약 체결)</h3>
        <ol>
          <li>
            이용계약은 이용자가 TOOK에서 제공하는 회원가입 신청 양식에서 요구하는 사항을 기록한 후 이 약관에 동의한다는
            의사표시를 함으로써 체결됩니다.
          </li>
          <li>
            회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다.
            <ul>
              <li>① 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
              <li>② 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
            </ul>
          </li>
          <li>회원가입계약의 성립시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제6조 (회원정보의 변경)</h3>
        <p>
          회원은 개인정보관리 화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를
          위해 필요한 아이디(ID) 등은 수정이 불가능합니다.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">제7조 (회원의 아이디 및 비밀번호 관리에 대한 의무)</h3>
        <ol>
          <li>아이디와 비밀번호에 관한 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.</li>
          <li>
            회원은 자신의 아이디 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하고
            회사의 안내가 있는 경우에는 그에 따라야 합니다.
          </li>
          <li>회사는 회원이 제2항을 위반하여 회원에게 발생한 손해에 대하여 책임지지 않습니다.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제8조 (이용자의 의무)</h3>
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ol>
          <li>신청 또는 변경 시 허위내용의 등록</li>
          <li>타인의 정보도용</li>
          <li>회사가 게시한 정보의 변경</li>
          <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
          <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
          <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
          <li>외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 TOOK에 공개 또는 게시하는 행위</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제9조 (서비스의 제공 등)</h3>
        <ol>
          <li>
            회사는 이용자에게 아래와 같은 서비스를 제공합니다.
            <ul>
              <li>① 명함 생성 및 관리 서비스</li>
              <li>② 명함 공유 및 커뮤니티 서비스</li>
              <li>③ 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 이용자에게 제공하는 일체의 서비스</li>
            </ul>
          </li>
          <li>
            회사는 서비스의 이용에 필요한 경우, 공지사항 등을 통해 개별 서비스의 세부적인 내용을 추가 안내할 수
            있습니다.
          </li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제10조 (서비스의 변경 및 중단)</h3>
        <ol>
          <li>
            회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할
            수 있습니다.
          </li>
          <li>
            회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검 시간은 TOOK에 공지한 바에 따릅니다.
          </li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제11조 (정보의 제공 및 광고의 게재)</h3>
        <ol>
          <li>
            회사는 이용자가 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로
            이용자에게 제공할 수 있습니다.
          </li>
          <li>회사는 서비스의 운영과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고를 게재할 수 있습니다.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제12조 (게시물의 저작권)</h3>
        <p>
          서비스 내에 게시한 게시물에 대한 저작권은 게시한 이용자에게 귀속됩니다. 단, 회사는 서비스의 운영, 전시, 전송,
          배포, 홍보 등의 목적으로 이용자의 별도 허락 없이 무상으로 저작물을 사용할 수 있습니다.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">제13조 (계약 해지 및 이용 제한)</h3>
        <ol>
          <li>
            이용자는 언제든지 서비스 내 제공되는 메뉴를 이용하여 이용계약을 해지할 수 있으며, 회사는 관련 법령 등이
            정하는 바에 따라 이를 즉시 처리합니다.
          </li>
          <li>
            이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 회사는 사전 통지 없이 서비스
            이용을 제한하거나 이용계약을 해지할 수 있습니다.
          </li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제14조 (책임 제한)</h3>
        <ol>
          <li>
            회사는 천재지변, 불가항력적 사유, 이용자의 귀책사유 등으로 인해 서비스를 제공할 수 없는 경우 책임을 지지
            않습니다.
          </li>
          <li>
            회사는 이용자가 서비스 이용과 관련하여 기대하는 수익을 얻지 못하거나 상실한 것에 대해 책임을 지지 않습니다.
          </li>
          <li>회사는 이용자가 게재한 정보, 자료, 사실의 신뢰도 및 정확성 등에 대해서는 책임을 지지 않습니다.</li>
        </ol>
      </section>

      <section>
        <h3 className="font-semibold">제15조 (준거법 및 재판관할)</h3>
        <ol>
          <li>회사와 이용자 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
          <li>회사와 이용자 간 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.</li>
        </ol>
      </section>
    </div>
  );
};

export default TermsView;
