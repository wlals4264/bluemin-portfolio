'use client';

import { useState } from 'react';

import FloatingIconButton from '@/components/common/buttons/FloatingIconButton';
import Icon3D from '@/components/common/media/Icon3D';
import { icon3dAssetsByKey } from '@/mocks/icon3dAssets';
import ContactModal from '@/components/contact/ContactModal';

import '@/styles/components/ContactLauncher.scss';

/**
 * 사이트 전체에 상시 떠 있는 Contact 진입점 — AmbientBackground가 이미 배경 전체를
 * 물결치는 수면으로 만들어두었으니(jquery.ripples), 그 위에 배 한 척을 살짝 띄워서
 * "이 바다를 같이 건널 동료를 찾는다"는 One Piece식 농담을 얹었다.
 *
 * 폼 자체(ContactModal)는 채용 담당자도 보는 화면이라 장난기를 넣지 않고 깔끔하게
 * 유지하고, 재미는 이 launcher의 hover 툴팁과 ContactModal의 전송 성공 화면,
 * 딱 두 곳에만 집중한다.
 */
const ContactLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="contact-launcher-container">
        <FloatingIconButton
          icon={<Icon3D src={icon3dAssetsByKey.ship.src} alt="" size="lg" />}
          tooltip="너, 내 동료가 되어라!"
          label="커피챗·연락 제안하기"
          /* ship 아이콘이 v1.1부터 파란 컬러 글래스가 주 재질이라, accent 톤(브랜드 블루
             유리)과 색이 겹쳐 버튼 배경 위에서 아이콘 실루엣이 묻혔다 — neutral(뒤 배경이
             비치는 맑은 유리)로 바꿔 아이콘 자체의 블루가 대비의 주체가 되게 한다. */
          tone="neutral"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ContactLauncher;
